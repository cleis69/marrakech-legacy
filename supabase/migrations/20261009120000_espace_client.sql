-- Espace propriétaire CITYSTAR : villas, propriétaires, étapes du chantier,
-- paiements, photos et documents. Un propriétaire ne voit que ses villas ;
-- le promoteur (table admins) voit et modifie tout.
--
-- Accès : le site n'utilise que la clé publique et la session de l'utilisateur.
-- Rien n'est ouvert au rôle anon ; tout passe par les règles RLS ci-dessous.
--
-- Premier administrateur, après sa première connexion au site :
--   insert into public.admins (email) values ('adresse@du-promoteur');

/* ------------------------------------------------------------------ */
/* Tables                                                              */
/* ------------------------------------------------------------------ */

create table public.admins (
  email text primary key check (email = lower(email)),
  ajoute_le timestamptz not null default now()
);

create table public.lots (
  id uuid primary key default gen_random_uuid(),
  numero int not null unique check (numero between 1 and 99),
  type text check (type in ('A', 'B', 'C')),
  -- Avancement global des travaux, saisi par le promoteur (0 à 100).
  avancement int not null default 0 check (avancement between 0 and 100),
  note text,
  maj_le timestamptz not null default now()
);

-- Une villa peut avoir plusieurs acquéreurs (un couple, une société et son gérant).
-- L'adresse est celle de connexion : le lien reçu par e-mail prouve qu'elle est à eux.
create table public.proprietaires (
  id uuid primary key default gen_random_uuid(),
  lot_id uuid not null references public.lots on delete cascade,
  email text not null check (email = lower(email)),
  nom text,
  ajoute_le timestamptz not null default now(),
  unique (lot_id, email)
);
create index on public.proprietaires (email);

-- Les cinq étapes de la frise du site (reservation… livraison).
create table public.etapes (
  id uuid primary key default gen_random_uuid(),
  lot_id uuid not null references public.lots on delete cascade,
  etape text not null check (etape in ('reservation', 'fondations', 'grosOeuvre', 'finitions', 'livraison')),
  ordre int not null,
  statut text not null default 'a_venir' check (statut in ('a_venir', 'en_cours', 'termine')),
  date_prevue date,
  date_fin date,
  note text,
  unique (lot_id, etape)
);

create table public.paiements (
  id uuid primary key default gen_random_uuid(),
  lot_id uuid not null references public.lots on delete cascade,
  libelle text not null,
  etape text check (etape in ('reservation', 'fondations', 'grosOeuvre', 'finitions', 'livraison')),
  montant numeric(12, 2) not null check (montant >= 0),
  devise text not null default 'EUR' check (devise in ('EUR', 'MAD', 'GBP', 'NOK')),
  echeance date,
  paye_le date,
  cree_le timestamptz not null default now()
);
create index on public.paiements (lot_id);

-- lot_id vide : photo de tout le domaine, visible par chaque propriétaire.
create table public.photos (
  id uuid primary key default gen_random_uuid(),
  lot_id uuid references public.lots on delete cascade,
  chemin text not null unique,
  legende text,
  prise_le date not null default current_date,
  cree_le timestamptz not null default now()
);
create index on public.photos (lot_id);

create table public.documents (
  id uuid primary key default gen_random_uuid(),
  lot_id uuid not null references public.lots on delete cascade,
  titre text not null,
  categorie text not null default 'autre' check (categorie in ('contrat', 'plan', 'appel', 'recu', 'autre')),
  chemin text not null unique,
  taille bigint,
  cree_le timestamptz not null default now()
);
create index on public.documents (lot_id);

/* ------------------------------------------------------------------ */
/* Qui est qui                                                         */
/* ------------------------------------------------------------------ */

create function public.mon_email() returns text
language sql stable
set search_path = ''
as $$ select lower(coalesce(auth.jwt() ->> 'email', '')) $$;

create function public.est_admin() returns boolean
language sql stable security definer
set search_path = ''
as $$ select exists (select 1 from public.admins where email = public.mon_email()) $$;

create function public.mes_lots() returns setof uuid
language sql stable security definer
set search_path = ''
as $$ select lot_id from public.proprietaires where email = public.mon_email() $$;

revoke execute on function public.mon_email(), public.est_admin(), public.mes_lots() from public, anon;
grant execute on function public.mon_email(), public.est_admin(), public.mes_lots() to authenticated;

/* ------------------------------------------------------------------ */
/* Automatismes                                                        */
/* ------------------------------------------------------------------ */

-- Chaque nouvelle villa reçoit les cinq étapes de la frise.
create function public.creer_etapes() returns trigger
language plpgsql security definer
set search_path = ''
as $$
begin
  insert into public.etapes (lot_id, etape, ordre)
  select new.id, e.etape, e.ordre
  from (values ('reservation', 1), ('fondations', 2), ('grosOeuvre', 3), ('finitions', 4), ('livraison', 5))
    as e (etape, ordre);
  return new;
end $$;

create trigger lots_etapes after insert on public.lots
for each row execute function public.creer_etapes();

-- La date « mis à jour le » de la villa suit toute modification de son suivi.
create function public.toucher_lot() returns trigger
language plpgsql security definer
set search_path = ''
as $$
begin
  update public.lots set maj_le = now() where id = coalesce(new.lot_id, old.lot_id);
  return null;
end $$;

create trigger etapes_maj after insert or update or delete on public.etapes
for each row execute function public.toucher_lot();
create trigger photos_maj after insert or update or delete on public.photos
for each row execute function public.toucher_lot();
create trigger documents_maj after insert or update or delete on public.documents
for each row execute function public.toucher_lot();
create trigger paiements_maj after insert or update or delete on public.paiements
for each row execute function public.toucher_lot();

create function public.dater_lot() returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.maj_le = now();
  return new;
end $$;

create trigger lots_maj before update on public.lots
for each row execute function public.dater_lot();

revoke execute on function public.creer_etapes(), public.toucher_lot(), public.dater_lot() from public, anon, authenticated;

/* ------------------------------------------------------------------ */
/* Droits et règles RLS                                                */
/* ------------------------------------------------------------------ */

alter table public.admins enable row level security;
alter table public.lots enable row level security;
alter table public.proprietaires enable row level security;
alter table public.etapes enable row level security;
alter table public.paiements enable row level security;
alter table public.photos enable row level security;
alter table public.documents enable row level security;

revoke all on public.admins, public.lots, public.proprietaires, public.etapes,
  public.paiements, public.photos, public.documents from anon;
grant select on public.admins to authenticated;
grant select, insert, update, delete on public.lots, public.proprietaires, public.etapes,
  public.paiements, public.photos, public.documents to authenticated;

-- La liste des administrateurs ne se modifie qu'en SQL, depuis le tableau de bord.
create policy "admins : lecture admin" on public.admins
for select to authenticated using ((select public.est_admin()));

create policy "lots : lecture" on public.lots
for select to authenticated
using ((select public.est_admin()) or id in (select public.mes_lots()));
create policy "lots : écriture admin" on public.lots
for all to authenticated
using ((select public.est_admin())) with check ((select public.est_admin()));

create policy "proprietaires : lecture" on public.proprietaires
for select to authenticated
using ((select public.est_admin()) or email = (select public.mon_email()));
create policy "proprietaires : écriture admin" on public.proprietaires
for all to authenticated
using ((select public.est_admin())) with check ((select public.est_admin()));

create policy "etapes : lecture" on public.etapes
for select to authenticated
using ((select public.est_admin()) or lot_id in (select public.mes_lots()));
create policy "etapes : écriture admin" on public.etapes
for all to authenticated
using ((select public.est_admin())) with check ((select public.est_admin()));

create policy "paiements : lecture" on public.paiements
for select to authenticated
using ((select public.est_admin()) or lot_id in (select public.mes_lots()));
create policy "paiements : écriture admin" on public.paiements
for all to authenticated
using ((select public.est_admin())) with check ((select public.est_admin()));

create policy "photos : lecture" on public.photos
for select to authenticated
using (
  (select public.est_admin())
  or lot_id in (select public.mes_lots())
  or (lot_id is null and exists (select public.mes_lots()))
);
create policy "photos : écriture admin" on public.photos
for all to authenticated
using ((select public.est_admin())) with check ((select public.est_admin()));

create policy "documents : lecture" on public.documents
for select to authenticated
using ((select public.est_admin()) or lot_id in (select public.mes_lots()));
create policy "documents : écriture admin" on public.documents
for all to authenticated
using ((select public.est_admin())) with check ((select public.est_admin()));

/* ------------------------------------------------------------------ */
/* Fichiers : deux espaces privés, lus par liens signés                */
/* ------------------------------------------------------------------ */

-- chantier/<lot_id>/… ou chantier/domaine/… ; documents/<lot_id>/…
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types) values
  ('chantier', 'chantier', false, 10485760, array['image/jpeg', 'image/png', 'image/webp']),
  ('documents', 'documents', false, 20971520, array['application/pdf', 'image/jpeg', 'image/png']);

create policy "fichiers : lecture" on storage.objects
for select to authenticated
using (
  bucket_id in ('chantier', 'documents')
  and (
    (select public.est_admin())
    or (storage.foldername(name))[1] in (select l::text from public.mes_lots() l)
    or (
      bucket_id = 'chantier'
      and (storage.foldername(name))[1] = 'domaine'
      and exists (select public.mes_lots())
    )
  )
);
create policy "fichiers : ajout admin" on storage.objects
for insert to authenticated
with check (bucket_id in ('chantier', 'documents') and (select public.est_admin()));
create policy "fichiers : modification admin" on storage.objects
for update to authenticated
using (bucket_id in ('chantier', 'documents') and (select public.est_admin()));
create policy "fichiers : suppression admin" on storage.objects
for delete to authenticated
using (bucket_id in ('chantier', 'documents') and (select public.est_admin()));

/* ------------------------------------------------------------------ */
/* Les quatorze villas du domaine                                      */
/* ------------------------------------------------------------------ */

-- Le type de chaque numéro reste à saisir par le promoteur.
insert into public.lots (numero) select generate_series(1, 14);
