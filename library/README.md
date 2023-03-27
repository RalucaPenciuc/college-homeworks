# Library

Cerinte generale: 
Se cere realizarea unei aplicatii (desktop sau web) cu arhitectura stratificata (presentation, business logic, data access), conform cerintelor problemei asignate. Limbajul de implementare va fi un limbaj orientat obiect, la alegere dintre cele deja studiate. Interfata cu utilizatorul se recomanda a fi realizata cu un instrument vizual (ex. NetBeans, WindowBuilder, Visual Studio). Se cere aplicarea
sablonului arhitectural MVC (Model-View-Controller). Aplicatia trebuie sa exploateze o baza de date relationala prin stratul de data access. Se impune ca interactiunea cu baza de date sa se faca prin intermediul unei biblioteci ORM (Object-Relational Mapping, ex. Hibernate/EclipseLink, NHibernate/Entity Framework), abordarea utilizata fiind cea „code-first”. Proiectul trebuie sa ofere
functii de tip CRUD (Create-Read-Update-Delete) pentru cel putin o entitate din domeniul problemei (clasa din Model).
Obligatoriu, toate modelele UML ale aplicației (functional, structurale, comportamentale) vor fi construite cu ajutorul unui instrument CASE (Computer Aided Software Engineering, ex. StarUML). Implementarea claselor din pachetul Model poate fi realizata partial folosind o operatie de tip forward/direct engineering, aplicata cu ajutorul instrumentului CASE folosit.

1. BIBLIOTECA
O biblioteca ofera abonatilor sai o lista de carti ce pot fi imprumutate. Pentru un abonat, se retin în sistem (cel putin) informații legate de cnp, nume, adresa, telefon și un cod unic de identificare a acestuia în cadrul bibliotecii. Fiecare carte poate exista în unul sau mai multe exemplare, identificate prin coduri unice. Biblioteca are mai multe terminale, de unde abonatii pot sa imprumute carti. Pentru a putea folosi un terminal, un abonat trebuie să se autentifice. Dupa autentificare, acesta vede lista exemplarelor disponibile în acel moment si poate imprumuta unul sau mai multe. Pentru restituirea cartilor, exista un singur punct de lucru, deservit de un bibliotecar. Dupa fiecare împrumut/restituire, toți utilizatorii terminalelor bibliotecii văd lista actualizata a cartilor disponibile.

Spre realizarea proiectului s-a ales:
- aplicatie desktop
- Java
