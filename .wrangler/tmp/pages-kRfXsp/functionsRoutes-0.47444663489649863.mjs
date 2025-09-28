import { onRequestGet as __api_admin_database_ts_onRequestGet } from "C:\\Users\\azizo\\OneDrive\\Desktop\\norbrot-test\\functions\\api\\admin\\database.ts"
import { onRequestOptions as __api_admin_database_ts_onRequestOptions } from "C:\\Users\\azizo\\OneDrive\\Desktop\\norbrot-test\\functions\\api\\admin\\database.ts"
import { onRequestOptions as __api_admin_mark_delivered_ts_onRequestOptions } from "C:\\Users\\azizo\\OneDrive\\Desktop\\norbrot-test\\functions\\api\\admin\\mark-delivered.ts"
import { onRequestPost as __api_admin_mark_delivered_ts_onRequestPost } from "C:\\Users\\azizo\\OneDrive\\Desktop\\norbrot-test\\functions\\api\\admin\\mark-delivered.ts"
import { onRequestGet as __api_auth_status_ts_onRequestGet } from "C:\\Users\\azizo\\OneDrive\\Desktop\\norbrot-test\\functions\\api\\auth\\status.ts"
import { onRequestGet as __api_debug_env_ts_onRequestGet } from "C:\\Users\\azizo\\OneDrive\\Desktop\\norbrot-test\\functions\\api\\debug-env.ts"
import { onRequestOptions as __api_order_ts_onRequestOptions } from "C:\\Users\\azizo\\OneDrive\\Desktop\\norbrot-test\\functions\\api\\order.ts"
import { onRequestPost as __api_order_ts_onRequestPost } from "C:\\Users\\azizo\\OneDrive\\Desktop\\norbrot-test\\functions\\api\\order.ts"
import { onRequestPost as __api_orders_ts_onRequestPost } from "C:\\Users\\azizo\\OneDrive\\Desktop\\norbrot-test\\functions\\api\\orders.ts"
import { onRequestGet as __api_products_ts_onRequestGet } from "C:\\Users\\azizo\\OneDrive\\Desktop\\norbrot-test\\functions\\api\\products.ts"
import { onRequestOptions as __api_register_ts_onRequestOptions } from "C:\\Users\\azizo\\OneDrive\\Desktop\\norbrot-test\\functions\\api\\register.ts"
import { onRequestPost as __api_register_ts_onRequestPost } from "C:\\Users\\azizo\\OneDrive\\Desktop\\norbrot-test\\functions\\api\\register.ts"

export const routes = [
    {
      routePath: "/api/admin/database",
      mountPath: "/api/admin",
      method: "GET",
      middlewares: [],
      modules: [__api_admin_database_ts_onRequestGet],
    },
  {
      routePath: "/api/admin/database",
      mountPath: "/api/admin",
      method: "OPTIONS",
      middlewares: [],
      modules: [__api_admin_database_ts_onRequestOptions],
    },
  {
      routePath: "/api/admin/mark-delivered",
      mountPath: "/api/admin",
      method: "OPTIONS",
      middlewares: [],
      modules: [__api_admin_mark_delivered_ts_onRequestOptions],
    },
  {
      routePath: "/api/admin/mark-delivered",
      mountPath: "/api/admin",
      method: "POST",
      middlewares: [],
      modules: [__api_admin_mark_delivered_ts_onRequestPost],
    },
  {
      routePath: "/api/auth/status",
      mountPath: "/api/auth",
      method: "GET",
      middlewares: [],
      modules: [__api_auth_status_ts_onRequestGet],
    },
  {
      routePath: "/api/debug-env",
      mountPath: "/api",
      method: "GET",
      middlewares: [],
      modules: [__api_debug_env_ts_onRequestGet],
    },
  {
      routePath: "/api/order",
      mountPath: "/api",
      method: "OPTIONS",
      middlewares: [],
      modules: [__api_order_ts_onRequestOptions],
    },
  {
      routePath: "/api/order",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_order_ts_onRequestPost],
    },
  {
      routePath: "/api/orders",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_orders_ts_onRequestPost],
    },
  {
      routePath: "/api/products",
      mountPath: "/api",
      method: "GET",
      middlewares: [],
      modules: [__api_products_ts_onRequestGet],
    },
  {
      routePath: "/api/register",
      mountPath: "/api",
      method: "OPTIONS",
      middlewares: [],
      modules: [__api_register_ts_onRequestOptions],
    },
  {
      routePath: "/api/register",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_register_ts_onRequestPost],
    },
  ]