"use strict";
const router_1 = require("@angular/router");
const index_1 = require("./components/dashboard/index");
const index_2 = require("./components/login/index");
const index_3 = require("./components/register/index");
const index_4 = require("./components/admin/index");
const appRoutes = [
    { path: '', component: index_1.DashboardComponent },
    { path: 'login', component: index_2.LoginComponent },
    { path: 'register', component: index_3.RegisterComponent },
    { path: 'admin', component: index_4.AdminComponent },
    { path: '**', redirectTo: '' }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
