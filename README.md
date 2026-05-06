# BookTrack-AWBD
# BookTrack – Platformă de gestionare a lecturilor personale

## Descriere proiect

BookTrack este o aplicație web dezvoltată cu Spring Boot, Spring Data JPA și Spring Security, având ca scop gestionarea lecturilor personale ale utilizatorilor. Aplicația permite administrarea cărților, autorilor, categoriilor literare, recenziilor și listelor de lectură.

Utilizatorii autentificați pot adăuga cărți în liste personale, pot scrie recenzii și pot consulta informații despre autori și categorii. Administratorii pot gestiona datele principale ale aplicației, precum cărțile, autorii, categoriile și utilizatorii.

## Obiectiv

Obiectivul proiectului este implementarea unei aplicații web cu arhitectură MVC, folosind Spring Boot, care să respecte cerințele obligatorii ale proiectului: model de date relațional, operații CRUD complete, validare, testare, autentificare, autorizare, paginare, sortare și logging.

## Entități principale

Aplicația conține următoarele entități:

1. User
2. Role
3. Book
4. Author
5. Category
6. Review
7. ReadingList

## Relații între entități

- Un utilizator are un singur rol, iar un rol poate aparține mai multor utilizatori.
- O carte aparține unui autor, iar un autor poate avea mai multe cărți.
- O carte aparține unei categorii, iar o categorie poate conține mai multe cărți.
- Un utilizator poate scrie mai multe recenzii.
- O carte poate avea mai multe recenzii.
- Un utilizator poate avea mai multe liste de lectură.
- O listă de lectură poate conține mai multe cărți, iar o carte poate apărea în mai multe liste.

## Cerințe funcționale

### Autentificare și autorizare

- Utilizatorii se pot înregistra în aplicație.
- Utilizatorii se pot autentifica folosind email și parolă.
- Aplicația conține minimum două roluri: USER și ADMIN.
- Accesul la anumite funcționalități este restricționat în funcție de rol.
- Utilizatorii se pot deloga din aplicație.

### Gestionare cărți

- Administratorul poate adăuga o carte nouă.
- Administratorul poate edita informațiile unei cărți.
- Administratorul poate șterge o carte.
- Utilizatorii pot vizualiza lista de cărți.
- Lista de cărți poate fi paginată și sortată.

### Gestionare autori

- Administratorul poate adăuga autori.
- Administratorul poate modifica datele unui autor.
- Administratorul poate șterge autori.
- Utilizatorii pot vizualiza autorii disponibili.

### Gestionare categorii

- Administratorul poate adăuga categorii literare.
- Administratorul poate modifica o categorie.
- Administratorul poate șterge o categorie.
- Utilizatorii pot filtra cărțile după categorie.

### Gestionare recenzii

- Utilizatorii autentificați pot adăuga recenzii pentru cărți.
- Utilizatorii pot edita propriile recenzii.
- Utilizatorii pot șterge propriile recenzii.
- Recenziile conțin rating și comentariu.
- Aplicația validează ratingul introdus.

### Gestionare liste de lectură

- Utilizatorii pot crea liste personale de lectură.
- Utilizatorii pot adăuga cărți în liste.
- Utilizatorii pot elimina cărți din liste.
- Utilizatorii pot șterge listele create.

### Validare

- Câmpurile obligatorii sunt validate.
- Emailul trebuie să aibă format valid.
- Parola trebuie să respecte o lungime minimă.
- Ratingul unei recenzii trebuie să fie într-un interval valid.
- Mesajele de eroare sunt clare și ușor de înțeles.

### Paginare și sortare

- Lista de cărți este paginată.
- Lista de autori este paginată.
- Lista de recenzii este paginată.
- Cărțile pot fi sortate după titlu, autor sau categorie.
- Recenziile pot fi sortate după rating sau dată.

.
