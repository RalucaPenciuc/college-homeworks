using LAB9_2.domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace LAB9_2.repository
{
    internal interface ICRUDRepository<ID, E>
    {
        /**
         * @DO: Search an entity
         * @RETURN: the entity with the specified id; null - if there is no entity with the given id
         * @PARAM id - the id of the entity to be returned; id must not be null
         * **/
        E FindOne(ID Id);

        /**
         * @DO: Return all entities
         * **/
        List<E> FindAll();

        /**
         * @DO: Save the given entity
         * @RETURN: null- if the given entity is saved; the entity - otherwise (id already exists)
         * @PARAM entity; entity must be not null
         * @THROWS ValidationException if the entity is not valid
         * **/
        E Save(E entity);

        /**
         * @DO: Removes the entity with the specified id
         * @RETURN: the removed entity; null - if there is no entity with the given id
         * @PARAM id; id must be not null
         * **/
        E Delete(ID Id);

        /**
         * @DO: Update the entity with the same Id as the Entity
         * @RETURN: null - if the entity is updated; the entity - otherwise (e.g id does not exist).
         * @PARAM entity; entity must not be null
         * @THROWS ValidationException if the entity is not valid.
         * **/
        E Update(E Entity);
    }
}
