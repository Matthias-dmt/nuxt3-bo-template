import { defineCustomElement } from "vue";
import Nuxt3DataUsageDashboard from "@/components/dashboards/DataUsage.vue";

const CustomElement = defineCustomElement(Nuxt3DataUsageDashboard);
if (!customElements.get("nuxt3-data-usage-dashboard")) {
  customElements.define("nuxt3-data-usage-dashboard", CustomElement);
}