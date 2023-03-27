using LAB9_2.console;
using LAB9_2.domain;
using LAB9_2.repository;
using LAB9_2.service;
using LAB9_2.validation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace LAB9_2
{
    class Program
    {
        static void Main(string[] args)
        {
            IValidator<Student> StudentValidator = new StudentValidator();
            IValidator<Tema> TemaValidator = new TemaValidator();
            IValidator<Nota> NotaValidator = new NotaValidator();

            StudentFileRepository StudentRepo = new StudentFileRepository(StudentValidator, "D:/Documente/ANUL 2/Semestrul 1/Metode Avansate De Programare/LABORATOARE/LAB9/LAB9-2/LAB9-2/studenti.txt");
            TemaFileRepository TemaRepo = new TemaFileRepository(TemaValidator, "D:/Documente/ANUL 2/Semestrul 1/Metode Avansate De Programare/LABORATOARE/LAB9/LAB9-2/LAB9-2/teme.txt");
            NotaFileRepository NotaRepo = new NotaFileRepository(NotaValidator, StudentRepo, TemaRepo, "D:/Documente/ANUL 2/Semestrul 1/Metode Avansate De Programare/LABORATOARE/LAB9/LAB9-2/LAB9-2/note.txt");

            Service Serv = new Service(StudentRepo, TemaRepo, NotaRepo);
            UI Consola = new UI(Serv);
            Consola.Run();

            ////------------------------
            //List<Student> cars = new List<Student>();
            //cars.Add(new Student("1", "ana", 221));
            //cars.Add(new Student("2", "ana1", 222));
            //cars.Add(new Student("3", "ana2", 221));
            //cars.Add(new Student("4", "ana3", 223));
            //cars.Add(new Student("5", "ana4", 221));
            //cars.Add(new Student("6", "ana5", 222));

            //IEnumerable<IGrouping<int, Student>> carGroups = cars.GroupBy(c => c.Grupa);
            ////-----------------

            //foreach (IGrouping<int, Student> g in carGroups)
            //{
            //    Console.WriteLine(g.Key);
            //    foreach (Student c in g)
            //        Console.WriteLine(c);
            //}
            //Console.ReadKey();
        }
    }
}
