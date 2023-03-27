using LAB9_2.domain;
using LAB9_2.validation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace LAB9_2.repository
{
    abstract class AbstractCRUDRepository<ID, E> : ICRUDRepository<ID, E> where E : IHasID<ID>
    {
        Dictionary<ID, E> Entities;
        readonly IValidator<E> validator;

        public AbstractCRUDRepository(IValidator<E> validator)
        {
            Entities = new Dictionary<ID, E>();
            this.validator = validator;
        }

        public E FindOne(ID Id)
        {
            bool result = Entities.TryGetValue(Id, out E entity);
            return result ? entity : default(E);
        }

        public List<E> FindAll()
        {
            return Entities.Values.ToList();
        }

        public E Save(E entity)
        {
            validator.Validate(entity);
            Entities.Add(entity.Id, entity);
            return default(E);
        }

        public E Delete(ID Id)
        {
            Entities.TryGetValue(Id, out E entity);
            bool result = Entities.Remove(Id);
            return result ? entity : default(E);
        }

        public E Update(E entity)
        {
            validator.Validate(entity);
            bool result = Entities.ContainsValue(entity);
            if (result)
            {
                Entities[entity.Id] = entity;
                return default(E);
            }
            return entity;
        }
    }
}
