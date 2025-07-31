const mineflayer = require('mineflayer');

const bot = mineflayer.createBot({
  host: 'rgmc.pl',
  username: 'TwojaNazwa123',
  auth: 'offline',
});

bot.on('spawn', () => {
  console.log('✅ Bot zalogowany');
  bot.setQuickBarSlot(8); // kompas w hotbarze
  bot.activateItem();

  bot.once('windowOpen', (window) => {
    const slotIndex = 31; // kompas EarthSMP
    bot.clickWindow(slotIndex, 0, 0);
  });

  bot.once('spawn', () => {
    setTimeout(() => {
      bot.chat('/dzialka praca');
    }, 5000);
  });
});

bot.on('windowOpen', (window) => {
  if (!window.title.includes('Oferty pracy')) return;

  const target = window.slots.find((slot) => {
    if (!slot) return false;
    return (
      slot.name === 'minecraft:green_concrete' &&
      slot.customName?.text?.includes('173 zalozyciela zlosliwy')
    );
  });

  if (target) {
    const index = window.slots.indexOf(target);
    bot.clickWindow(index, 0, 0);
    console.log('✅ Kliknięto ofertę pracy');
  }
});
