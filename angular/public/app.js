var app=angular.module("assignment3",["ngRoute"]);app.config(["$routeProvider",function(e){e.when("/",{controller:"MainController",templateUrl:"templates/main.html"}).when("/register",{controller:"RegisterController",templateUrl:"templates/register.html"}).otherwise({controller:"NotFoundController",templateUrl:"templates/not_found.html"})}]),app.run(["$rootScope","$location",function(e,t){var n="ws://"+t.host()+":"+t.port(),o=new WebSocket(n);o.onmessage=function(t){var n=JSON.parse(t.data),o="ws:"+n.topic;e.$broadcast(o,n.data)}}]),app.controller("ApplicationController",["$scope","$location","SessionsService",function(e,t,n){e.$on("login",function(t,n){e.currentUser=n}),e.logout=function(){n.logout(),delete e.currentUser,t.path("register")}}]),app.controller("MainController",["$scope","$location","AlbumsService",function(e,t,n){e.albums=[],e.$on("ws:new public album",function(t,n){n.creator!==e.currentUser.username&&(e.albums.unshift(n),e.$apply())}),e.$on("ws:removed album",function(t,n){n.creator!==e.currentUser.username&&(_.remove(e.albums,{_id:n._id}),e.$apply())}),n.query().success(function(t){e.albums=t}).error(function(e,n){401===n&&(t.path("/register"),alert("You need to be logged in to go here!"))}),e.newAlbum={},e.saveAlbum=function(){return e.newAlbum.title&&e.newAlbum.artist?void n.save(e.newAlbum).success(function(t){e.albums.unshift(t),e.newAlbum={}}):void alert("Please enter a title and an artist.")},e.toggleStatus=function(t){n.toggleStatus(t._id,t["public"]).success(function(){_.find(e.albums,function(e){e._id===t._id&&(e["public"]=!e["public"])})})},e.deleteAlbum=function(t){n["delete"](t).success(function(){_.remove(e.albums,{_id:t})})}}]),app.service("AlbumsService",["$http",function(e){this.query=function(){return e.get("/api/albums")},this.save=function(t){return e.post("/api/albums",t)},this.toggleStatus=function(t,n){return e.put("/api/albums/"+t,{"public":!n})},this["delete"]=function(t){return e["delete"]("/api/albums/"+t)}}]),app.controller("RegisterController",["$scope","$location","SessionsService",function(e,t,n){e.newUser={},e.register=function(){return e.newUser.username&&e.newUser.password?void n.register(e.newUser).success(function(){n.login(e.newUser.username,e.newUser.password).then(function(n){e.$emit("login",n.data.user),t.path("/")})}).error(function(e,t){alert(412===t?"Username already exists! Try another.":t+": "+e)}):void alert("Please enter a username and password")},e.login=function(o,r){n.login(o,r).then(function(n){e.$emit("login",n.data.user),t.path("/")})}}]),app.service("SessionsService",["$http",function(e){this.register=function(t){return e.post("/api/users",t)},this.login=function(t,n){var o={username:t,password:n};return e.post("/api/sessions",o).success(function(t){return e.defaults.headers.common["x-auth"]=t.token,t}).error(function(e,t){404===t&&alert("Wrong username or password")})},this.logout=function(){delete e.defaults.headers.common["x-auth"]}}]),app.controller("NotFoundController",["$scope",function(e){e.message="Not found!"}]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRyb2xsZXJzLmpzIl0sIm5hbWVzIjpbImFwcCIsImFuZ3VsYXIiLCJtb2R1bGUiLCJjb25maWciLCIkcm91dGVQcm92aWRlciIsIndoZW4iLCJjb250cm9sbGVyIiwidGVtcGxhdGVVcmwiLCJvdGhlcndpc2UiLCJydW4iLCIkcm9vdFNjb3BlIiwiJGxvY2F0aW9uIiwidXJsIiwiaG9zdCIsInBvcnQiLCJjb25uZWN0aW9uIiwiV2ViU29ja2V0Iiwib25tZXNzYWdlIiwiZXZlbnQiLCJwYXlsb2FkIiwiSlNPTiIsInBhcnNlIiwiZGF0YSIsImV2ZW50TmFtZSIsInRvcGljIiwiJGJyb2FkY2FzdCIsIiRzY29wZSIsIlNlc3Npb25zU2VydmljZSIsIiRvbiIsInVzZXIiLCJjdXJyZW50VXNlciIsImxvZ291dCIsInBhdGgiLCJBbGJ1bXNTZXJ2aWNlIiwiYWxidW1zIiwiYWxidW0iLCJjcmVhdG9yIiwidXNlcm5hbWUiLCJ1bnNoaWZ0IiwiJGFwcGx5IiwiXyIsInJlbW92ZSIsIl9pZCIsInF1ZXJ5Iiwic3VjY2VzcyIsImVycm9yIiwic3RhdHVzIiwiYWxlcnQiLCJuZXdBbGJ1bSIsInNhdmVBbGJ1bSIsInRpdGxlIiwiYXJ0aXN0Iiwic2F2ZSIsInRvZ2dsZVN0YXR1cyIsImZpbmQiLCJjdXJyZW50QWxidW0iLCJkZWxldGVBbGJ1bSIsImlkIiwic2VydmljZSIsIiRodHRwIiwidGhpcyIsImdldCIsInBvc3QiLCJjdXJyZW50U3RhdHVzIiwicHV0IiwicHVibGljIiwibmV3VXNlciIsInJlZ2lzdGVyIiwicGFzc3dvcmQiLCJsb2dpbiIsInRoZW4iLCJyZXNwb25zZSIsIiRlbWl0IiwibWVzc2FnZSIsImxvZ2luQXR0ZW1wdCIsImRlZmF1bHRzIiwiaGVhZGVycyIsImNvbW1vbiIsInRva2VuIl0sIm1hcHBpbmdzIjoiQUFBQSxHQUFBQSxLQUFBQyxRQUFBQyxPQUFBLGVBQ0EsV0FHQUYsS0FBQUcsUUFBQSxpQkFBQSxTQUFBQyxHQUNBQSxFQUNB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RSxVQUFBRSxLQUFBLFNBQUFDLEdBQ0E3QyxFQUFBOEMsTUFBQSxRQUFBRCxFQUFBakQsS0FBQU8sTUFDQWxCLEVBQUFxQixLQUFBLFNBR0FhLE1BQUEsU0FBQTRCLEVBQUEzQixHQUVBQyxNQURBLE1BQUFELEVBQ0Esd0NBRUFBLEVBQUEsS0FBQTJCLFNBZkExQixPQUFBLHlDQW9CQXJCLEVBQUEyQyxNQUFBLFNBQUFoQyxFQUFBK0IsR0FDQXpDLEVBQUEwQyxNQUFBaEMsRUFBQStCLEdBQUFFLEtBQUEsU0FBQUMsR0FDQTdDLEVBQUE4QyxNQUFBLFFBQUFELEVBQUFqRCxLQUFBTyxNQUNBbEIsRUFBQXFCLEtBQUEsV0FLQWhDLElBQUEwRCxRQUFBLG1CQUFBLFFBQUEsU0FBQUMsR0FDQUMsS0FBQU8sU0FBQSxTQUFBdEMsR0FDQSxNQUFBOEIsR0FBQUcsS0FBQSxhQUFBakMsSUFHQStCLEtBQUFTLE1BQUEsU0FBQWhDLEVBQUErQixHQUNBLEdBQUFNLElBQ0FyQyxTQUFBQSxFQUNBK0IsU0FBQUEsRUFHQSxPQUFBVCxHQUFBRyxLQUFBLGdCQUFBWSxHQUNBOUIsUUFBQSxTQUFBMkIsR0FFQSxNQURBWixHQUFBZ0IsU0FBQUMsUUFBQUMsT0FBQSxVQUFBTixFQUFBTyxNQUNBUCxJQUVBMUIsTUFBQSxTQUFBNEIsRUFBQTNCLEdBQ0EsTUFBQUEsR0FDQUMsTUFBQSxpQ0FLQWEsS0FBQTdCLE9BQUEsaUJBQ0E0QixHQUFBZ0IsU0FBQUMsUUFBQUMsT0FBQSxjQUlBN0UsSUFBQU0sV0FBQSxzQkFBQSxTQUFBLFNBQUFvQixHQUNBQSxFQUFBK0MsUUFBQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgYXBwID0gYW5ndWxhci5tb2R1bGUoJ2Fzc2lnbm1lbnQzJywgW1xuICAgICduZ1JvdXRlJ1xuXSk7XG5cbmFwcC5jb25maWcoZnVuY3Rpb24gKCRyb3V0ZVByb3ZpZGVyKSB7XG4gICAgJHJvdXRlUHJvdmlkZXJcbiAgICAgICAgLndoZW4oJy8nLCB7Y29udHJvbGxlcjogJ01haW5Db250cm9sbGVyJywgdGVtcGxhdGVVcmw6ICd0ZW1wbGF0ZXMvbWFpbi5odG1sJ30pXG4gICAgICAgIC53aGVuKCcvcmVnaXN0ZXInLCB7Y29udHJvbGxlcjogJ1JlZ2lzdGVyQ29udHJvbGxlcicsIHRlbXBsYXRlVXJsOiAndGVtcGxhdGVzL3JlZ2lzdGVyLmh0bWwnfSlcbiAgICAgICAgLm90aGVyd2lzZSh7Y29udHJvbGxlcjogJ05vdEZvdW5kQ29udHJvbGxlcicsIHRlbXBsYXRlVXJsOiAndGVtcGxhdGVzL25vdF9mb3VuZC5odG1sJ30pO1xufSk7XG5cbmFwcC5ydW4oZnVuY3Rpb24gKCRyb290U2NvcGUsICRsb2NhdGlvbikge1xuICAgIHZhciB1cmwgPSAnd3M6Ly8nICsgJGxvY2F0aW9uLmhvc3QoKSArICc6JyArICRsb2NhdGlvbi5wb3J0KCk7XG4gICAgdmFyIGNvbm5lY3Rpb24gPSBuZXcgV2ViU29ja2V0KHVybCk7XG5cbiAgICBjb25uZWN0aW9uLm9ubWVzc2FnZSA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICB2YXIgcGF5bG9hZCA9IEpTT04ucGFyc2UoZXZlbnQuZGF0YSk7XG4gICAgICAgIHZhciBldmVudE5hbWUgPSAnd3M6JyArIHBheWxvYWQudG9waWM7XG5cbiAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KGV2ZW50TmFtZSwgcGF5bG9hZC5kYXRhKTtcbiAgICB9O1xufSk7XG5cbmFwcC5jb250cm9sbGVyKCdBcHBsaWNhdGlvbkNvbnRyb2xsZXInLCBmdW5jdGlvbiAoJHNjb3BlLCAkbG9jYXRpb24sIFNlc3Npb25zU2VydmljZSkge1xuICAgICRzY29wZS4kb24oJ2xvZ2luJywgZnVuY3Rpb24gKGV2ZW50LCB1c2VyKSB7XG4gICAgICAgICRzY29wZS5jdXJyZW50VXNlciA9IHVzZXI7XG4gICAgfSk7XG5cbiAgICAkc2NvcGUubG9nb3V0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBTZXNzaW9uc1NlcnZpY2UubG9nb3V0KCk7XG4gICAgICAgIGRlbGV0ZSAkc2NvcGUuY3VycmVudFVzZXI7XG4gICAgICAgICRsb2NhdGlvbi5wYXRoKCdyZWdpc3RlcicpO1xuICAgIH07XG59KTtcblxuYXBwLmNvbnRyb2xsZXIoJ01haW5Db250cm9sbGVyJywgZnVuY3Rpb24gKCRzY29wZSwgJGxvY2F0aW9uLCBBbGJ1bXNTZXJ2aWNlKSB7XG4gICAgJHNjb3BlLmFsYnVtcyA9IFtdO1xuXG4gICAgJHNjb3BlLiRvbignd3M6bmV3IHB1YmxpYyBhbGJ1bScsIGZ1bmN0aW9uIChldmVudCwgYWxidW0pIHtcbiAgICAgICAgaWYgKGFsYnVtLmNyZWF0b3IgIT09ICRzY29wZS5jdXJyZW50VXNlci51c2VybmFtZSkge1xuICAgICAgICAgICAgJHNjb3BlLmFsYnVtcy51bnNoaWZ0KGFsYnVtKTtcbiAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgJHNjb3BlLiRvbignd3M6cmVtb3ZlZCBhbGJ1bScsIGZ1bmN0aW9uIChldmVudCwgYWxidW0pIHtcbiAgICAgICAgaWYgKGFsYnVtLmNyZWF0b3IgIT09ICRzY29wZS5jdXJyZW50VXNlci51c2VybmFtZSkge1xuICAgICAgICAgICAgXy5yZW1vdmUoJHNjb3BlLmFsYnVtcywge19pZDogYWxidW0uX2lkfSk7XG4gICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIEFsYnVtc1NlcnZpY2UucXVlcnkoKVxuICAgICAgICAuc3VjY2VzcyhmdW5jdGlvbiAoYWxidW1zKSB7XG4gICAgICAgICAgICAkc2NvcGUuYWxidW1zID0gYWxidW1zO1xuICAgICAgICB9KVxuICAgICAgICAuZXJyb3IoZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgaWYgKHN0YXR1cyA9PT0gNDAxKSB7XG4gICAgICAgICAgICAgICAgJGxvY2F0aW9uLnBhdGgoJy9yZWdpc3RlcicpO1xuICAgICAgICAgICAgICAgIGFsZXJ0KCdZb3UgbmVlZCB0byBiZSBsb2dnZWQgaW4gdG8gZ28gaGVyZSEnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAkc2NvcGUubmV3QWxidW0gPSB7fTtcblxuICAgICRzY29wZS5zYXZlQWxidW0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghJHNjb3BlLm5ld0FsYnVtLnRpdGxlIHx8ICEkc2NvcGUubmV3QWxidW0uYXJ0aXN0KSB7XG4gICAgICAgICAgICBhbGVydCgnUGxlYXNlIGVudGVyIGEgdGl0bGUgYW5kIGFuIGFydGlzdC4nKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIEFsYnVtc1NlcnZpY2Uuc2F2ZSgkc2NvcGUubmV3QWxidW0pXG4gICAgICAgICAgICAuc3VjY2VzcyhmdW5jdGlvbiAoYWxidW0pIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuYWxidW1zLnVuc2hpZnQoYWxidW0pO1xuICAgICAgICAgICAgICAgICRzY29wZS5uZXdBbGJ1bSA9IHt9O1xuICAgICAgICAgICAgfSk7XG4gICAgfTtcblxuICAgICRzY29wZS50b2dnbGVTdGF0dXMgPSBmdW5jdGlvbiAoYWxidW0pIHtcbiAgICAgICAgQWxidW1zU2VydmljZS50b2dnbGVTdGF0dXMoYWxidW0uX2lkLCBhbGJ1bS5wdWJsaWMpLnN1Y2Nlc3MoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgXy5maW5kKCRzY29wZS5hbGJ1bXMsIGZ1bmN0aW9uIChjdXJyZW50QWxidW0pIHtcbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudEFsYnVtLl9pZCA9PT0gYWxidW0uX2lkKSB7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRBbGJ1bS5wdWJsaWMgPSAhY3VycmVudEFsYnVtLnB1YmxpYztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgICRzY29wZS5kZWxldGVBbGJ1bSA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgICBBbGJ1bXNTZXJ2aWNlLmRlbGV0ZShpZCkuc3VjY2VzcyhmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBfLnJlbW92ZSgkc2NvcGUuYWxidW1zLCB7X2lkOiBpZH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xufSk7XG5cbmFwcC5zZXJ2aWNlKCdBbGJ1bXNTZXJ2aWNlJywgZnVuY3Rpb24gKCRodHRwKSB7XG4gICAgdGhpcy5xdWVyeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuICRodHRwLmdldCgnL2FwaS9hbGJ1bXMnKTtcbiAgICB9O1xuXG4gICAgdGhpcy5zYXZlID0gZnVuY3Rpb24gKG5ld0FsYnVtKSB7XG4gICAgICAgIHJldHVybiAkaHR0cC5wb3N0KCcvYXBpL2FsYnVtcycsIG5ld0FsYnVtKTtcbiAgICB9O1xuXG4gICAgdGhpcy50b2dnbGVTdGF0dXMgPSBmdW5jdGlvbiAoaWQsIGN1cnJlbnRTdGF0dXMpIHtcbiAgICAgICAgcmV0dXJuICRodHRwLnB1dCgnL2FwaS9hbGJ1bXMvJyArIGlkLCB7cHVibGljOiAhY3VycmVudFN0YXR1c30pO1xuICAgIH07XG5cbiAgICB0aGlzLmRlbGV0ZSA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgICByZXR1cm4gJGh0dHAuZGVsZXRlKCcvYXBpL2FsYnVtcy8nICsgaWQpO1xuICAgIH07XG59KTtcblxuYXBwLmNvbnRyb2xsZXIoJ1JlZ2lzdGVyQ29udHJvbGxlcicsIGZ1bmN0aW9uICgkc2NvcGUsICRsb2NhdGlvbiwgU2Vzc2lvbnNTZXJ2aWNlKSB7XG4gICAgJHNjb3BlLm5ld1VzZXIgPSB7fTtcblxuICAgICRzY29wZS5yZWdpc3RlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCEkc2NvcGUubmV3VXNlci51c2VybmFtZSB8fCAhJHNjb3BlLm5ld1VzZXIucGFzc3dvcmQpIHtcbiAgICAgICAgICAgIGFsZXJ0KCdQbGVhc2UgZW50ZXIgYSB1c2VybmFtZSBhbmQgcGFzc3dvcmQnKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIFNlc3Npb25zU2VydmljZS5yZWdpc3Rlcigkc2NvcGUubmV3VXNlcilcbiAgICAgICAgICAgIC5zdWNjZXNzKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBTZXNzaW9uc1NlcnZpY2UubG9naW4oJHNjb3BlLm5ld1VzZXIudXNlcm5hbWUsICRzY29wZS5uZXdVc2VyLnBhc3N3b3JkKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuJGVtaXQoJ2xvZ2luJywgcmVzcG9uc2UuZGF0YS51c2VyKTtcbiAgICAgICAgICAgICAgICAgICAgJGxvY2F0aW9uLnBhdGgoJy8nKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuZXJyb3IoZnVuY3Rpb24gKG1lc3NhZ2UsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGlmIChzdGF0dXMgPT09IDQxMikgeyAvLyBiYWQgcmVxdWVzdDsgdXNlcm5hbWUgZXhpc3RzXG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KCdVc2VybmFtZSBhbHJlYWR5IGV4aXN0cyEgVHJ5IGFub3RoZXIuJyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoc3RhdHVzICsgJzogJyArIG1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgIH07XG5cbiAgICAkc2NvcGUubG9naW4gPSBmdW5jdGlvbiAodXNlcm5hbWUsIHBhc3N3b3JkKSB7XG4gICAgICAgIFNlc3Npb25zU2VydmljZS5sb2dpbih1c2VybmFtZSwgcGFzc3dvcmQpLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAkc2NvcGUuJGVtaXQoJ2xvZ2luJywgcmVzcG9uc2UuZGF0YS51c2VyKTtcbiAgICAgICAgICAgICRsb2NhdGlvbi5wYXRoKCcvJyk7XG4gICAgICAgIH0pO1xuICAgIH07XG59KTtcblxuYXBwLnNlcnZpY2UoJ1Nlc3Npb25zU2VydmljZScsIGZ1bmN0aW9uICgkaHR0cCkge1xuICAgIHRoaXMucmVnaXN0ZXIgPSBmdW5jdGlvbiAodXNlcikge1xuICAgICAgICByZXR1cm4gJGh0dHAucG9zdCgnL2FwaS91c2VycycsIHVzZXIpO1xuICAgIH07XG5cbiAgICB0aGlzLmxvZ2luID0gZnVuY3Rpb24gKHVzZXJuYW1lLCBwYXNzd29yZCkge1xuICAgICAgICB2YXIgbG9naW5BdHRlbXB0ID0ge1xuICAgICAgICAgICAgdXNlcm5hbWU6IHVzZXJuYW1lLFxuICAgICAgICAgICAgcGFzc3dvcmQ6IHBhc3N3b3JkXG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoJy9hcGkvc2Vzc2lvbnMnLCBsb2dpbkF0dGVtcHQpXG4gICAgICAgICAgICAuc3VjY2VzcyhmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICAkaHR0cC5kZWZhdWx0cy5oZWFkZXJzLmNvbW1vblsneC1hdXRoJ10gPSByZXNwb25zZS50b2tlbjtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmVycm9yKGZ1bmN0aW9uIChtZXNzYWdlLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBpZiAoc3RhdHVzID09PSA0MDQpIHtcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoJ1dyb25nIHVzZXJuYW1lIG9yIHBhc3N3b3JkJyk7IC8vIFRPRE86IGRvIHRoaXMgaW4gY29udHJvbGxlciBzb21laG93XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIHRoaXMubG9nb3V0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBkZWxldGUgJGh0dHAuZGVmYXVsdHMuaGVhZGVycy5jb21tb25bJ3gtYXV0aCddO1xuICAgIH07XG59KTtcblxuYXBwLmNvbnRyb2xsZXIoJ05vdEZvdW5kQ29udHJvbGxlcicsIGZ1bmN0aW9uICgkc2NvcGUpIHtcbiAgICAkc2NvcGUubWVzc2FnZSA9ICdOb3QgZm91bmQhJztcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9