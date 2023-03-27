using LAB9_2.domain;
using LAB9_2.validation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace LAB9_2.repository
{
    class NotaRepository : AbstractCRUDRepository<KeyValuePair<Student, Tema>, Nota>
    {
        public NotaRepository(IValidator<Nota> validator) : base(validator) { }
    }
}
