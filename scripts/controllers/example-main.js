define(['angular'], function(angular) {
   'use strict';

   return function(
      $rootScope, $scope, $log, $state, $filter, $timeout,
      StorageManager, AuthService, ExampleService, vuiConstants) {

      $log = $log.getInstance('ExampleMainController', true);
      $log.debug('In example main controller global scope');

      var translate = $filter('translate'),
         currentState = $state.current.name;

      $rootScope.mainPanel.icon = 'esx-icon-example';
      $rootScope.mainPanel.title = AuthService.getHostname() + ' - ' +
         translate('dvol.title');

      var pClickFunction = function(event, tab) {
         tab.loaded = true;
         $state.go(tab.state);
         StorageManager.set('example_current_state', tab.state);
      }, getSelectedTab = function(state) {
         var selected = 0;
         state = angular.isUndefined(state) ? $state.current.name : state;

         angular.forEach($scope.exampleTabs.tabs, function(value, key) {
            if (value.state === state) {
               selected = key;
               value.loaded = true;
            }
         });

         return selected;
      };

      $scope.tabs = {
         one: {
            label: translate('dvol.tabs.one.label'),
            tooltipText: translate('dvol.tabs.one.tooltip'),
            contentUrl: 'plugins/docker-volume-plugin/views/dvol-tab-one.html',
            onClick: pClickFunction,
            state: 'host.docker-volume-plugin.one'
         },
         two: {
            label: translate('dvol.tabs.two.label'),
            tooltipText: translate('dvol.tabs.two.tooltip'),
            contentUrl: 'plugins/docker-volume-plugin/views/dvol-tab-two.html',
            onClick: pClickFunction,
            state: 'host.docker-volume-plugin.two'
         }
      };

      $scope.exampleTabs = {
         tabs: Object.keys($scope.tabs).map(function (key) {
            return $scope.tabs[key];
         }),
         tabType: vuiConstants.tabs.type.PRIMARY,
         selectedTabIndex: 0
      };

      $timeout(function () {
         if ($state.current.name === 'host.example') {
            $log.debug('top-level tab state, getting pre-selected tab');
            currentState = StorageManager.get('example_current_state',
               'host.docker-volume-plugin.one');
         }

         if (currentState !== 'host.docker-volume-plugin') {
            $timeout(function () {
               $state.go(currentState);
            });
         }

         var defaultTab = getSelectedTab();
         $scope.exampleTabs.selectedTabIndex = defaultTab;
         $scope.exampleTabs.tabs[defaultTab].loaded = true;

         StorageManager.set('example_current_state', currentState);
         $scope.exampleTabs.selectedTabIndex = getSelectedTab(currentState);
      });
   };
});
