<template>
  <div className="App">
    <Header />
    <main className="d-flex align-items-center">
      <div className="container">
        <WizardForm />
      </div>
    </main>
  </div>
</template>

<script>
import Header from "./components/Header";
import WizardForm from "./components/WizardForm";
import "./styles/app.scss";

export default {
  name: "App",
  components: {
    Header,
    WizardForm,
  },
};
</script>
