import { Controller } from "stimulus";
import { Turbo } from "@hotwired/turbo-rails";

export default class extends Controller {
  static values = { nextPage: Number };

  connect() {
    this.observe();
  }

  disconnect() {
    this.unobserve();
  }

  observe() {
    this.intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.loadNextPage();
          }
        });
      },
      { threshold: 1.0 }
    );

    this.intersectionObserver.observe(this.element);
  }

  unobserve() {
    this.intersectionObserver.disconnect();
  }

  loadNextPage() {
    const nextPage = this.nextPageValue;
    Turbo.visit(`${window.location.pathname}?page=${nextPage}`, {
      action: "replace",
      target: this.element,
    });
  }
}
