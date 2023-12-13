import { createApp } from "vue";
import { store } from "@/store";
import App from "@/App.vue";
import router from "@/router";

import "@/assets/scss/style.scss";

/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/* import specific icons */
import { faPerson, faPersonDress } from "@fortawesome/free-solid-svg-icons";

/* add icons to the library */
library.add(faPerson, faPersonDress);

const app = createApp(App);
app.use(store);
app.use(router);
app.component("FontAwesomeIcon", FontAwesomeIcon);
app.mount("#app");
