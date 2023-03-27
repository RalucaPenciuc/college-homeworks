using LAB9_2.domain;
using LAB9_2.repository;
using LAB9_2.validation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace LAB9_2.repository
{
    abstract class AbstractFileRepository<ID, E> : AbstractCRUDRepository<ID, E> where E : IHasID<ID>
    {
        protected string filename;

        public AbstractFileRepository(IValidator<E> validator, string filename) : base(validator)
        {
            this.filename = filename;
        }

        protected abstract void LoadFromFile();
        protected abstract void WriteToFile(E entity);
        protected abstract void WriteToFileAll();

        public new List<E> FindAll()
        {
            return base.FindAll();
        }

        public E JustSave(E entity)
        {
            E result = base.Save(entity);
            return result;
        }

        public new E Save(E entity)
        {
            E result = base.Save(entity);
            if (result == null) WriteToFile(entity);
            return result;
        }

        public new E Delete(ID Id)
        {
            E result = base.Delete(Id);
            WriteToFileAll();

            return result;
        }

        public new E Update(E entity)
        {
            E result = base.Update(entity);
            WriteToFileAll();

            return result;
        }
    }
}
