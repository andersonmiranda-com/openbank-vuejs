<template>
  <header>
    <nav className="navbar navbar-expand-sm navbar-light">
      <div className="container">
        <a className="navbar-brand" href="#">
          <img src="../assets/logo_openbank.png" alt="logo" />
        </a>
        <button
          className="navbar-toggler d-lg-none"
          type="button"
          data-toggle="collapse"
          data-target="#collapsibleNavId"
          aria-controls="collapsibleNavId"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="collapsibleNavId">
          <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
            <li className="nav-item">
              <a className="nav-link" href="#" @click="changeLanguage('en')">
                EN
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" @click="changeLanguage('es')">
                ES
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import "../styles/header.scss";
import { useI18n } from "vue-i18n";
export default {
  setup() {
    const { t, x } = useI18n();
    console.log(x, t);
    return { t };
  },
  methods: {
    changeLanguage(lang) {
      this.$i18n.locale = lang;
    },
  },
};
</script>
