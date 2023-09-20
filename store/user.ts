import { defineStore } from "pinia";
import {
  AboutusAnualModel,
  AboutusContentModel,
  AboutusPartnerModel,
  ChallengeModel,
  ExperienceModel,
  SlideshowModel,
  SolutionModel,
} from "~~/types";

interface AboutUs {
  annual: AboutusAnualModel[];
  content: AboutusContentModel[];
  partner: AboutusPartnerModel[];
}

interface Home {
  challenges: ChallengeModel[];
  experiences: ExperienceModel[];
  slides: SlideshowModel[];
  solutions: SolutionModel[];
}

export const useUserStore = defineStore("dashboard", {
  state: () => ({
    home: null as Home | null,
    aboutus: { annual: [], content: [], partner: [] } as AboutUs,
  }),
  actions: {
    async getHome() {
      try {
        const data = await apiFetch<Home>("home/", {
          method: "GET",
        });
        this.home = data;
        return data;
      } catch (e) {
        throw e;
      }
    },
    // about-us
    async getAboutus() {
      try {
        const data = await apiFetch<AboutUs>("about_us/", {
          method: "GET",
        });
        this.aboutus = {
          annual: data.annual,
          content: data.content,
          partner: data.partner,
        };
        return data;
      } catch (e) {
        throw e;
      }
    },
    // content
    async createAboutusContent(form: { content: string }) {
      const { successToast } = useToastNotif();
      try {
        const data = await apiFetch<AboutusContentModel>(
          "website/add_about_us_content/",
          {
            method: "POST",
            body: { ...form },
          }
        );
        this.aboutus.content.unshift(data);
        successToast("با موفقیت ثبت شد");
        return data;
      } catch (e) {
        throw e;
      }
    },
    async removeAboutusContent(id: number) {
      const { successToast } = useToastNotif();
      try {
        await apiFetch(`website/remove_about_us_content/${id}/`, {
          method: "POST",
        });
        this.aboutus.content = this.aboutus.content.filter((i) => i.id !== id);
        successToast("با موفقیت حذف شد");
        return id;
      } catch (e) {
        throw e;
      }
    },
    // annual
    async createAboutusAnnual(form: { content: string; year: string }) {
      const { successToast } = useToastNotif();
      try {
        const data = await apiFetch<AboutusAnualModel>(
          "website/add_about_us_annual/",
          {
            method: "POST",
            body: { ...form },
          }
        );
        this.aboutus.annual.unshift(data);
        successToast("با موفقیت ثبت شد");
        return data;
      } catch (e) {
        throw e;
      }
    },
    async removeAboutusAnnual(id: number) {
      const { successToast } = useToastNotif();
      try {
        await apiFetch(`website/remove_about_us_annual/${id}/`, {
          method: "POST",
        });
        this.aboutus.annual = this.aboutus.annual.filter((i) => i.id !== id);
        successToast("با موفقیت حذف شد");
        return id;
      } catch (e) {
        throw e;
      }
    },
    // partner
    async createAboutusPartner(form: { logo: Blob; link: string }) {
      const { createFormdata } = useFunctions();
      const { successToast } = useToastNotif();
      try {
        const formData = createFormdata({ ...form });
        const data = await apiFetch<AboutusPartnerModel>(
          "website/add_about_us_partner/",
          {
            method: "POST",
            body: formData,
          }
        );
        this.aboutus.partner.unshift(data);
        successToast("با موفقیت ثبت شد");
        return data;
      } catch (e) {
        throw e;
      }
    },
    async removeAboutusPartner(id: number) {
      const { successToast } = useToastNotif();
      try {
        await apiFetch(`website/remove_about_us_partner/${id}/`, {
          method: "POST",
        });
        this.aboutus.partner = this.aboutus.partner.filter((i) => i.id !== id);
        successToast("با موفقیت حذف شد");
        return id;
      } catch (e) {
        throw e;
      }
    },
  },
});
