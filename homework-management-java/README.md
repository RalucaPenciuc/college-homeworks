# HomeworkManagement

Dezvoltați o aplicație care ajută cadrele didactice să monitorizeze predarea temelor de laborator la disciplina MAP.
Observație: Se va folosi Metodologia de dezvoltare incrementală bazată pe funcționalități (feature-driven development process).
Datele despre studenți se citesc din fișierul Studenti.txt și cuprind următoarele informații: idStudent (numărul matricol al studentului), numele, grupa, email, cadru didactic îndrumător de laborator(numele).
Datele referitoare la temele de laborator se citesc din fișierul Teme.txt, care conține informații precum: numărul temei de laborator (identificator unic), descrierea pe scurt a cerinței, termen limită de predare (deadline) - săptămâna din cursul semestrului (1..14), săptămâna în care a fost primită tema (1..14). Profesorul acordă o notă de la 1 la 10 pentru fiecare temă de laborator. Predarea unei teme după săptămâna în care este stabilit termenu de predare al temei respective conduce la diminuarea notei cu 2.5 puncte pentru fiecare săptămână de întârziere.
Informațiile despre note se vor salva in fișierul Catalog.txt. Aplicația va oferi profesorului următoarele funcționalități:
- F0 (Iterația 1): Implementarea operațiilor CRUD pt entitatea Student
- F1 (Iterația 1): adăugarea unei teme de laborator;
- F2 (Iterația 1): prelungirea termenului de predare pt o temă existentă (dacă nr săptămânii curente este mai mic sau egal decât nr săptămânii cu termenul de predare).
- F3 (Iterația 4): la adăugarea unei noi teme de laborator, precum si la modificare termenului de predare al unei teme, toți studenții vor fi notificați printr-un mail. Aplicația va oferi posibilitatea dezabonării de la aceste notificări.
- F4 (Iterația 2): Adăugarea unei note pentru un anumit student la o temă de laborator. Eventualele depunctări datorate întârzierilor în predarea unei teme se vor calcula automat, afișându-se nota maximă pe care o poate lua studentul pentru tema respectivă. Important: Un student, la o tema de laborator, are o singură notă; După 2 săptămâni de întârziere în predarea unei teme, tema respectivă nu va mai putea fi predată, decât daca este o situație excepțională: studentul a lipsit motivat (vezi funcționalitatea 7).
- F5 (Iterația 2): la adăugarea unei note se vor adăuga în fișierul NumeStudent.txt următoarele informații:
    o ”Tema:” numărul temei
    o ”Nota:” nota acordată pe tema respectivă
    o ”Predată în săptămâna:” nr Săptămână în care tema a fost Predată
    o ”Deadline:” nr Săptămână cu termen limită de predare, Deadline
    o ”Feedback:” aprecieri, sugestii, precizări în legătură cu depunctările efectuate.
          Exemplu:
          Tema: 3
          Tema: 3
          Nota: 9.5
          Predată în săptămâna: 5
          Deadline: 5
          Feedback:
          - Vezi conceptul de Interfata - in proiectul tau, obiectele de tipul repository nu sunt
          declarate de tipul interfetei.
          Tema: 4
          Nota: 8
          Predată în săptămâna: 5
          Deadline: 5
          Feedback:
          - Vezi conceptul de Interfata - in proiectul tau, obiectele de tipul repository nu sunt
          declarate de tipul interfetei
          - Cod duplicat la Repository – sugestie: definirea unei clase AbstractFileRepository
- F6 -(Iterația 4): Fișierul NumeStudent.txt (sau conținutul lui) va fi trimis printr-un mail studentului respectiv, săptămânal, mail ce va avea subiectul “Feedback laborator MAP”.
- F7 - (Iterația 3 – Doar pentru interfață grafică): Întârzierile nu se depunctează dacă studentul a lipsit motivat. Discutați cu cadrul didactic de la laborator cum ar fi mai bine sa implementați această funcționalitate. De asemenea, găsiți o soluție și pentru situația când profesorul nu a introdus notele la timp.
- F10 - (Iterația 3): Filtrarea entităților în baza unor criterii. Criteriile se vor stabili ulterior.
- F11 (Iterația 4): Rapoarte 
    o Nota la laborator pentru fiecare student (media ponderată a notelor de la temele de laborator; pondere tema=nr de săptămâni alocate temei).
    o Cea mai grea tema: media notelor la tema respectivă este cea mai mică.
    o Studenții care pot intra în examen (media mai mare sau egală cu 4).
    o Studenții care au predat la timp toate temele.
