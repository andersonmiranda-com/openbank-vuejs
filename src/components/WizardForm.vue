<template>
  <div class="wizard">
    <div class="content">
      <Stepper :step="step" />

      <section v-if="step === 0">
        <h2 class="section-heading">{{ t("Welcome!") }}</h2>
        <p>{{ t('Thank you for choosing "Cuenta Corriente OpenClose".') }}</p>

        <p>{{ t("Your account is almost ready to be used.") }}</p>

        <p>
          {{
            t(
              "In the next steps, we will guide you to complete your account creation by setting up your password."
            )
          }}
        </p>

        <p>
          {{
            t('To start, please agree with the terms and click "Next" button.')
          }}
        </p>

        <br />

        <div class="form-check mt-5">
          <form>
            <input
              type="checkbox"
              class="form-check-input"
              id="consent"
              name="consent"
              v-model="consent"
            />

            <label htmlFor="consent" class="form-check-label text-small">
              <small>
                {{
                  t(
                    "I am of legal age and I accept that my data be treated according to the"
                  )
                }}
                <a href="#"> {{ t("privacy police") }}</a
                >.
              </small>
            </label>
          </form>
        </div>

        <div class="row mt-2">
          <div class="col-6"></div>

          <div class="col-6">
            <button
              class="btn btn-sm btn-secondary float-right"
              @click="nextStep"
              :disabled="notConsent"
            >
              {{ t("Next") }} <BIconChevronRight />
            </button>
          </div>
        </div>
      </section>

      <section v-else-if="step === 1">
        <h2 class="section-heading">{{ t("Password setup") }}</h2>

        <p>
          {{ t("First, you need to set up your password") }}: <br />
          <small>
            {{
              t(
                "(It must contains from 8 to 24 characters and at least 1 capital letter and 1 number)"
              )
            }}
          </small>
        </p>
        <form>
          <div class="form-row">
            <div class="col-md-6 mb-3">
              <label htmlFor="pass" class="sr-only">
                {{ t("Password") }}
              </label>
              <input
                type="password"
                name="pass"
                id="pass"
                required
                class="form-control"
                :class="formHasError('pass') ? 'is-invalid' : ''"
                :placeholder="t('Password')"
                v-model="pass"
                onChange="{handleInputChange}"
              />
              <small :class="formHasError('pass') ? 'text-danger' : 'd-none'">
                {{ t("Invalid password") }} {{ pass }}
              </small>
            </div>
            <div class="col-md-6">
              <label htmlFor="repass" class="sr-only">
                {{ t("Confirm password") }}
              </label>
              <input
                type="password"
                name="repass"
                id="repass"
                required
                class="form-control"
                :class="formHasError('repass') ? 'is-invalid' : ''"
                :placeholder="t('Confirm password')"
                v-model="repass"
                onChange="{handleInputChange}"
              />
              <small :class="formHasError('repass') ? 'text-danger' : 'd-none'">
                {{ t("Passwords does not match") }}
              </small>
            </div>
          </div>

          <p>
            {{
              t(
                "You can also create a hint to help you remember your password"
              )
            }}:
          </p>

          <div class="form-group">
            <label htmlFor="hint" class="sr-only">
              {{ t("Hint") }}
            </label>
            <input
              type="text"
              name="hint"
              id="hint"
              required
              class="form-control"
              :class="formHasError('hint') ? 'is-invalid' : ''"
              :placeholder="t('Hint')"
              onChange="{handleInputChange}"
            />
            <small :class="formHasError('hint') ? 'text-danger' : 'd-none'">
              {{ t("Hint too long") }}
            </small>
          </div>
        </form>

        <div class="row mt-5">
          <div class="col-6">
            <button
              class="btn btn-sm btn-light float-left"
              @click="previousStep"
            >
              <BIconChevronLeft />
              {{ t("Previous") }}
            </button>
          </div>

          <div class="col-6">
            <button
              class="btn btn-sm btn-secondary float-right"
              @click="checkPassword"
              :disabled="formSending"
            >
              <div
                class="spinner-border spinner-border-sm mr-2"
                role="status"
                aria-hidden="true"
                v-if="formSending"
              ></div>

              {{ t("Next") }} <BIconChevronRight />
            </button>
          </div>
        </div>
      </section>

      <section v-else-if="step === 2">
        <div v-if="formSuccess">
          <h2 class="section-heading">
            <BIconCheckCircle class="successIcon" /> {{ t("Congratulations!") }}
          </h2>
          <p>{{ t("Your password was saved successfully") }}.</p>
          <p>{{ t("You can start to use your account now") }}.</p>
          <div class="row mt-5">
            <div class="col-6">
              <button class="btn btn-sm btn-light float-left" @click="restart">
                <BIconChevronLeft />
                {{ t("Restart") }}
              </button>
            </div>
            <div class="col-6">
              <button class="btn btn-sm btn-secondary float-right">
                {{ t("Access my account") }}
                <BIconChevronRight />
              </button>
            </div>
          </div>
        </div>

        <div v-if="!formSuccess">
          <h2 class="section-heading">
            <BIconExclamationDiamond class="errorIcon" />{" "}
            {{ t("An error was occurred") }}
            :(
          </h2>
          <p>
            {{
              t("Was not possible save your password. Please try agian later.")
            }}
          </p>
          <div class="row mt-5">
            <div class="col-6">
              <button
                class="btn btn-sm btn-secondary float-left"
                @click="restart"
              >
                <BIconChevronLeft />
                {{ t("Try again") }}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { useI18n } from "vue-i18n";
import "../styles/wizard_form.scss";
import { submitForm } from "../services/api";
import {
  BIconChevronRight,
  BIconChevronLeft,
  BIconCheckCircle,
  BIconExclamationDiamond,
} from "bootstrap-icons-vue";

import Stepper from "./Stepper";

export default {
  name: "wizard-form",
  components: {
    Stepper,
    BIconChevronRight,
    BIconChevronLeft,
    BIconCheckCircle,
    BIconExclamationDiamond,
  },
  setup() {
    const { t } = useI18n();
    return { t };
  },
  data() {
    return {
      step: 0,
      consent: false,
      pass: "",
      repass: "",
      hint: "",
      formSending: false,
      formSuccess: false,
      formErrors: [],
    };
  },
  methods: {
    restart() {
      this.step = 0;
      this.consent = false;
      this.pass = "";
      this.repass = "";
      this.hint = "";
      this.formSending = false;
      this.formSuccess = false;
    },
    nextStep() {
      const newStep = this.step + 1;
      if (newStep < 3) this.step = newStep;
    },
    previousStep() {
      const newStep = this.step - 1;
      if (newStep >= 0) this.step = newStep;
    },
    formHasError(key) {
      return this.formErrors.indexOf(key) !== -1;
    },
    async checkPassword() {
      //validate fields
      const passPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,24}$/;
      const errors = [];
      if (!passPattern.test(this.pass) || this.pass.length === 0)
        errors.push("pass");
      if (this.repass !== this.pass) errors.push("repass");
      if (this.hint.length > 255) errors.push("hint");
      this.formErrors = errors;
      console.log("check");

      if (errors.length === 0) {
        //submit data, call backend
        try {
          this.formSending = true;
          const result = await submitForm(this.pass);
          this.formSending = false;
          this.formSuccess = result.status === 200;
        } catch (e) {
          this.formSending = false;
          this.formSuccess = false;
        }
        this.step += 1;
      }
    },
  },
  computed: {
    notConsent() {
      return this.consent == false;
    },
  },
};
</script>
