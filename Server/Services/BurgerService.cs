using System;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Server.Models;

namespace Server.Services {
    public class BurgerService {

        private StackBurgerContext Context { get; }
        public BurgerService(StackBurgerContext context) {
            Context = context;
        }

        public async Task<ReturnModel<object>> GetSampleBurgers() {
            object burgers = await GetBurgers();
            return new ReturnModel<object>(burgers, 200, "All burger returned");
        }

        public async Task<ReturnModel<object>> GetCustomBurgersByUserId(Guid? userId) {
            if (userId == null)
                return new ReturnModel<object>(null, 400, "Incorrect user id");
            object burgers = await GetBurgers(userId);
            return new ReturnModel<object>(burgers, 200, "Burger returned");
        }

        private async Task<object> GetBurgers(Guid? userId = null) {
            List<Burger> burgers = new List<Burger>();

            List<Guid> ids = await Context.Burgers
                .Where(b => b.UserId == userId)
                .Select(b => b.Id).ToListAsync();
            foreach (Guid id in ids)
                burgers.Add(await GetBurger(id));
            var result = burgers.Select(b => new {
                Id = b.Id,
                Name = b.Name,
                Descripton = b.Description,
                Components = b.Components.Select(c => c.Name).ToList(),
                Price = b.Components.Sum(c => c.Price),
                Calories = b.Components.Sum(c => c.Calories)
            });
            return result;
        }

        public async Task<ReturnModel<Burger>> GetBurgerById(Guid? id) {
            if (id == null)
                return new ReturnModel<Burger>(null, 400, "Incorrect burger id");
            Burger burger = await GetBurger(id);
            if(burger == null)
                return new ReturnModel<Burger>(null, 404, "There is no such a burger");
            return new ReturnModel<Burger>(burger, 200, "Burger returned");
        }

        private async Task<Burger> GetBurger(Guid? id) {
            Burger burger = await Context.Burgers.
                SingleOrDefaultAsync(b => b.Id == id);
            if (burger == null)
                return null;
            burger.Components = await Context.BurgersComponents
                .Where(bc => bc.BurgerId == burger.Id)
                .OrderBy(bc => bc.SerialNumber)
                .Select(bc => Context.Components
                    .Single(c => c.Id == bc.ComponentId))
                .ToListAsync();
            return burger;
        }

        public async Task<Guid?> AddBurger(BurgerPostModel model) {
            Burger burger;
            try
            {
                burger = new Burger(model);
                List<BurgerComponent> components = new List<BurgerComponent>();
                for (int i = 0; i < model.ComponentsIds.Count; i++)
                    components.Add(new BurgerComponent
                    {
                        BurgerId = burger.Id,
                        ComponentId = model.ComponentsIds[i],
                        SerialNumber = i
                    });

                await Context.Burgers.AddAsync(burger);
                await Context.BurgersComponents.AddRangeAsync(components);
                await Context.SaveChangesAsync();
            }
            catch
            {
                return null;
            }
            return burger.Id;
        }
    }
}
