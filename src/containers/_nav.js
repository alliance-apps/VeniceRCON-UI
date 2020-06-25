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
        _name: 'CSidebarNavTitle',
        _children: ['Server'],
        serverSpecific: true
      },

      {
        _name: 'CSidebarNavItem',
        name: 'Dashboard',
        to: '/#id/dashboard',
        serverSpecific: true,
        icon: 'cil-speedometer',
        badge: {
          color: 'primary',
          text: 'NEW'
        }
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Players',
        to: '/#id/players',
        serverSpecific: true,
        icon: 'cil-drop'
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Chat',
        to: '/theme/typography',
        serverSpecific: true,
        icon: 'cil-pencil'
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Events',
        to: '/theme/typography',
        serverSpecific: true,
        icon: 'cil-pencil'
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Banlist',
        to: '/theme/typography',
        serverSpecific: true,
        icon: 'cil-pencil'
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Maplist',
        to: '/theme/typography',
        serverSpecific: true,
        icon: 'cil-pencil'
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Configuration',
        to: '/theme/typography',
        serverSpecific: true,
        icon: 'cil-pencil'
      },

      {
        _name: 'CSidebarNavItem',
        name: 'Plugins',
        to: '/plugins',
        serverSpecific: true,
        icon: 'cil-speedometer',
        badge: {
          color: 'primary',
          text: 'Coming SoonTM'
        }
      },


      {
        _name: 'CSidebarNavTitle',
        _children: ['Extras']
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Download Plugins',
        href: 'https://veniceunleashed.net',
        icon: { name: 'cil-cloud-download', class: 'text-white' },
        _class: 'bg-success text-white',
        target: '_blank'
      },/*
      {
        _name: 'CSidebarNavItem',
        name: 'Rent a server',
        href: 'http://coreui.io/pro/vue/',
        icon: { name: 'cil-layers', class: 'text-white' },
        _class: 'bg-danger text-white',
        target: '_blank'
      }*/
    ]
  }
]