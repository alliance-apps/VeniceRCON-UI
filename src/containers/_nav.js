export default [
  {
    _name: 'CSidebarNav',
    _children: [

      {
        _name: 'CSidebarNavItem',
        name: 'Servers',
        to: '/servers',
        icon: 'cil-list'
      },

      {
        _name: 'CSidebarNavItem',
        name: 'SERVERDIRECT',
        to: 0,
        icon: 'cil-storage'
      },
      {
        _name: 'CSidebarNavItem',
        name: 'SERVERDIRECT',
        to: 1,
        icon: 'cil-storage'
      },
      {
        _name: 'CSidebarNavItem',
        name: 'SERVERDIRECT',
        to: 2,
        icon: 'cil-storage'
      },
      {
        _name: 'CSidebarNavItem',
        name: 'SERVERDIRECT',
        to: 3,
        icon: 'cil-storage'
      },
      {
        _name: 'CSidebarNavItem',
        name: 'SERVERDIRECT',
        to: 4,
        icon: 'cil-storage'
      },
      {
        _name: 'CSidebarNavItem',
        name: 'SERVERDIRECT',
        to: 5,
        icon: 'cil-storage'
      },

      {
        _name: 'CSidebarNavTitle',
        _children: ['Server'],
        to: '/#id/dashboard',
        serverSpecific: true
      },

      {
        _name: 'CSidebarNavItem',
        name: 'Dashboard',
        to: '/#id/dashboard',
        serverSpecific: true,
        icon: 'cil-speedometer',
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Players',
        to: '/#id/players',
        serverSpecific: true,
        icon: 'cil-user'
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Chat',
        to: '/#id/chat',
        serverSpecific: true,
        icon: 'cil-chat-bubble',
        permission: 'EVENT#CHAT'
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Banlist',
        to: '/#id/bans',
        serverSpecific: true,
        icon: 'cil-ban',
        permission: 'BAN#ACCESS'
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Maplist',
        to: '/#id/maps',
        serverSpecific: true,
        icon: 'cil-list-numbered'
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Modlist',
        to: '/#id/mods',
        serverSpecific: true,
        icon: 'cil-tag',
        permission: 'MOD#ACCESS'
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Configuration',
        to: '/#id/config',
        serverSpecific: true,
        icon: 'cil-settings'
      },

      {
        _name: 'CSidebarNavItem',
        name: 'Plugins',
        to: '/#id/plugins',
        serverSpecific: true,
        icon: 'cil-input-power',
        badge: {
          color: 'primary',
          text: 'Coming SoonTM'
        },
        permission: 'PLUGIN#ACCESS'
      },


      {
        _name: 'CSidebarNavTitle',
        _children: ['Extras']
      },
        /*
      {
        _name: 'CSidebarNavItem',
        name: 'Download Plugins',
        href: 'https://veniceunleashed.net',
        icon: { name: 'cil-cloud-download', class: 'text-white' },
        _class: 'bg-success text-white',
        target: '_blank'
      },*/
      {
        _name: 'CSidebarNavItem',
        name: 'Rent a server',
        href: 'https://allianceapps.io/vuserver',
        icon: { name: 'cil-layers', class: 'text-white' },
        _class: 'bg-danger text-white',
        target: '_blank'
      }
    ]
  }
]