export default [
  {
    _name: 'CSidebarNav',
    _children: [


      {
        _name: 'CSidebarNavTitle',
        _children: ['Server']
      },

      {
        _name: 'CSidebarNavItem',
        name: 'Dashboard',
        to: '/dashboard',
        icon: 'cil-speedometer',
        badge: {
          color: 'primary',
          text: 'NEW'
        }
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Players',
        to: '/theme/colors',
        icon: 'cil-drop'
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Chat',
        to: '/theme/typography',
        icon: 'cil-pencil'
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Events',
        to: '/theme/typography',
        icon: 'cil-pencil'
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Banlist',
        to: '/theme/typography',
        icon: 'cil-pencil'
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Maplist',
        to: '/theme/typography',
        icon: 'cil-pencil'
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Configuration',
        to: '/theme/typography',
        icon: 'cil-pencil'
      },

      {
        _name: 'CSidebarNavItem',
        name: 'Plugins',
        to: '/plugins',
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