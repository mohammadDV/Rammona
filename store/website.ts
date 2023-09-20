import { defineStore } from "pinia";
import {
  ChallengeModel,
  ClientModel,
  ExperienceModel,
  ServiceModel,
  SlideshowModel,
  SolutionModel,
} from "~~/types";

export const useWebsiteStore = defineStore("website", {
  state: () => ({
    slideshows: [] as SlideshowModel[],
    challenges: [] as ChallengeModel[],
    solutions: [] as SolutionModel[],
    services: [] as ServiceModel[],
    clients: [] as ClientModel[],
    experiences: [] as ExperienceModel[],
  }),
  actions: {
    // challenges
    async getChallenges() {
      try {
        const res = await apiFetch<{ challenges: ChallengeModel[] }>(
          `website/challenge_list/`,
          {
            method: "GET",
          }
        );
        this.challenges = res.challenges;
        return res;
      } catch (e) {
        throw e;
      }
    },
    async createChallenge(payload: {
      icon: Blob;
      title: string;
      content: string;
    }) {
      const { errorToast } = useToastNotif();
      try {
        const { createFormdata } = useFunctions();
        const formdata = createFormdata(payload);
        const res = await apiFetch(`website/add_challenge/`, {
          method: "POST",
          body: formdata,
        });
        this.challenges.unshift(res);
        return res;
      } catch (e) {
        errorToast("مشکلی رخ داده است.");
        throw e;
      }
    },
    async deleteChallenge(id: number) {
      try {
        const res = await apiFetch(`website/remove_challenge/${id}/`, {
          method: "POST",
        });
        this.challenges = this.challenges.filter((i) => i.id !== id);
        return res;
      } catch (e) {
        throw e;
      }
    },
    // clients
    async getClients() {
      try {
        const res = await apiFetch<{ clients: ClientModel[] }>(
          `website/client_list/`,
          {
            method: "GET",
          }
        );
        this.clients = res.clients;
        return res;
      } catch (e) {
        throw e;
      }
    },
    async createClient(payload: { logo: Blob }) {
      const { errorToast } = useToastNotif();
      try {
        const { createFormdata } = useFunctions();
        const formdata = createFormdata(payload);
        const res = await apiFetch<ClientModel[]>(`website/add_client/`, {
          method: "POST",
          body: formdata,
        });
        this.clients.unshift(res);
        return res;
      } catch (e) {
        errorToast("مشکلی رخ داده است.");
        throw e;
      }
    },
    async deleteClient(id: number) {
      try {
        const res = await apiFetch(`website/remove_client/${id}/`, {
          method: "POST",
        });
        this.clients = this.clients.filter((i) => i.id !== id);
        return res;
      } catch (e) {
        throw e;
      }
    },
    // experiences
    async getExperiences() {
      try {
        const res = await apiFetch<{ experiences: ExperienceModel[] }>(
          `website/experience_list/`,
          {
            method: "GET",
          }
        );
        this.experiences = res.experiences;
        return res;
      } catch (e) {
        throw e;
      }
    },
    async createExperience(payload: {
      icon: string;
      title: string;
      rate: number;
      number: number;
    }) {
      const { errorToast } = useToastNotif();
      try {
        const res = await apiFetch(`website/add_experience/`, {
          method: "POST",
          body: { ...payload },
        });
        this.experiences.unshift(res);
        return res;
      } catch (e) {
        errorToast("مشکلی رخ داده است.");
        throw e;
      }
    },
    async deleteExperience(id: number) {
      try {
        const res = await apiFetch(`website/remove_experience/${id}/`, {
          method: "POST",
        });
        this.experiences = this.experiences.filter((i) => i.id !== id);
        return res;
      } catch (e) {
        throw e;
      }
    },
    // services
    async getServices() {
      try {
        const res = await apiFetch<{ services: ServiceModel[] }>(
          `website/service_list/`,
          {
            method: "GET",
          }
        );
        this.services = res.services;
        return res;
      } catch (e) {
        throw e;
      }
    },
    async createService(payload: {
      image: Blob;
      title: string;
      content: string;
    }) {
      const { errorToast } = useToastNotif();
      try {
        const { createFormdata } = useFunctions();
        const formdata = createFormdata(payload);
        const res = await apiFetch<ServiceModel>(`website/add_service/`, {
          method: "POST",
          body: formdata,
        });
        this.services.unshift(res);
        return res;
      } catch (e) {
        errorToast("مشکلی رخ داده است.");
        throw e;
      }
    },
    async deleteService(id: number) {
      try {
        const res = await apiFetch(`website/remove_service/${id}/`, {
          method: "POST",
        });
        this.services = this.services.filter((i) => i.id !== id);
        return res;
      } catch (e) {
        throw e;
      }
    },
    // slideshows
    async getSlideshows() {
      try {
        const res = await apiFetch<{ slides: SlideshowModel[] }>(
          `website/slide_show_list/`,
          {
            method: "GET",
          }
        );
        this.slideshows = res.slides;
        return res;
      } catch (e) {
        throw e;
      }
    },
    async createSlideshow(payload: { image: Blob }) {
      const { errorToast } = useToastNotif();
      try {
        const { createFormdata } = useFunctions();
        const formdata = createFormdata(payload);
        const res = await apiFetch(`website/add_slide_show/`, {
          method: "POST",
          body: formdata,
        });
        this.slideshows.unshift(res);
        return res;
      } catch (e) {
        errorToast("مشکلی رخ داده است.");
        throw e;
      }
    },
    async deleteSlideshow(id: number) {
      try {
        const res = await apiFetch(`website/remove_slide_show/${id}/`, {
          method: "POST",
        });
        this.slideshows = this.slideshows.filter((i) => i.id !== id);
        return res;
      } catch (e) {
        throw e;
      }
    },
    // solutions
    async getSolutions() {
      try {
        const res = await apiFetch<{
          solutions: SolutionModel[];
        }>(`website/solution_list/`, {
          method: "GET",
        });
        this.solutions = res.solutions;
        return res;
      } catch (e) {
        throw e;
      }
    },
    async createSolution(payload: {
      icon: Blob;
      title: string;
      content: string;
    }) {
      const { errorToast } = useToastNotif();
      try {
        const { createFormdata } = useFunctions();
        const formdata = createFormdata(payload);
        const res = await apiFetch<SolutionModel>(`website/add_solution/`, {
          method: "POST",
          body: formdata,
        });
        this.solutions.unshift(res);
        return res;
      } catch (e) {
        errorToast("مشکلی رخ داده است.");
        throw e;
      }
    },
    async deleteSolution(id: number) {
      try {
        const res = await apiFetch(`website/remove_solution/${id}/`, {
          method: "POST",
        });
        this.solutions = this.solutions.filter((i) => i.id !== id);
        return res;
      } catch (e) {
        throw e;
      }
    },
  },
});
