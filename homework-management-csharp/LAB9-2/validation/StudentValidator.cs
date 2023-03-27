using LAB9_2.domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace LAB9_2.validation
{
    class StudentValidator : IValidator<Student>
    {
        public void Validate(Student student)
        {
            if (student.Id == null || student.Id.Equals("")) throw new ValidationException("ID invalid! \n");
            if (student.Nume == null || student.Nume.Equals("")) throw new ValidationException("Nume invalid! \n");
            if (student.Grupa <= 110 || student.Grupa >= 938) throw new ValidationException("Grupa invalida! \n");
        }
    }
}
