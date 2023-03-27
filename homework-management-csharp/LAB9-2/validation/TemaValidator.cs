using LAB9_2.domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace LAB9_2.validation
{
    class TemaValidator : IValidator<Tema>
    { 
        public void Validate(Tema tema)
        {
            if (tema.Id == null || tema.Id.Equals("")) throw new ValidationException("ID invalid! \n");
            if (tema.Descriere == null || tema.Descriere.Equals("")) throw new ValidationException("Descriere invalida! \n");
            if (tema.Deadline < 1 || tema.Deadline > 14 || tema.Deadline < tema.Startline) throw new ValidationException("Deadline invalid! \n");
            if (tema.Startline < 1 || tema.Startline > 14 || tema.Startline > tema.Deadline) throw new ValidationException("Startline invalid! \n");
        }
    }
}
