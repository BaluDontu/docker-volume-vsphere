define(['angular'], function (angular) {
   'use strict';

   return function (
      $q,
      $log,
      $filter,
      VIMService,
      ENV) {

      $log = $log.getInstance('DvolDialogService', true);
      $log.debug('In example dialog service global scope');

      var translate = $filter('translate');

      this.showDialog = function (dialog, opaque) {
         switch(dialog) {
            case 'example.about':
               return {
                  title: translate('dvol.dialogs.about.title'),
                  icon: 'esx-icon-about',
                  width: '585px',
                  height: '280px',
                  content: 'plugins/docker-volume-plugin/views/about-dialog.html',
                  objects: {
                     ENV: ENV,
                     esxiVersion: VIMService.getESXVersion(),
                     esxiBuildNumber: VIMService.getESXBuildNumber()
                  },
                  confirmOptions: {
                     label: translate('client.about.close'),
                     onClick: function () {
                        return true;
                     }
                  }
               };
               break;
         }
      };
   };
});
