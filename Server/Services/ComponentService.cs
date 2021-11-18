using System;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Server.Models;

namespace Server.Services {
    public class ComponentService {
        private StackBurgerContext Context { get; }
        public ComponentService(StackBurgerContext context) {
            Context = context;
        }

        public async Task<List<Component>> GetComponents() {
            List<Component> components;
            try
            {
                components = await Context.Components.ToListAsync();
            }
            catch
            {
                return null;
            }
            return components;
        }
    }
}
