import {
    CMI_COVERAGE,
    PRODUCT_CAPACITIES,
    TURBINES,
    SCENARIO_CATEGORY,
} from "~~/const";
import { UserModel } from "./auth";

export type ThemeModel = "light" | "dark";

export type LangModel = "fa" | "en";

export interface ProductModel {
    id: number;
    name: string;
    capacity: string;
    capacity_currency: typeof PRODUCT_CAPACITIES[number];
    project: number;
}

export interface ClauseTemplateModel {
    id: number;
    number: number;
    title: string;
}

export interface ClauseModel {
    id: number;
    clause: ClauseTemplateModel;
    project: number;
    text: string;
}

export interface TurbineModel {
    id: number;
    count: number;
    model_brand: typeof TURBINES[number];
    project: number;
}

export interface CmiModel {
    id: number;
    main_coverage_cmi: typeof CMI_COVERAGE[number];
    project: number;
}
export interface ProjectModel {
    duration: number;
    project_type: string;
    category: string;
    title: string;
    insured: string;
    insurer: string;
    insurer_branch: string;
    policy: string;
    policy_file: string;
    sum_insured: string;
    sum_insured_file: string;
    sum_insured_currency: string;
    survey_start_date: string;
    survey_end_date: string;
    risk_surveyor: string;
    project_manager: string;
    main_coverage: string;
    main_coverage_file: string;
    eml_percentage: string;
    eml: string;
    under_insurance: string;
    over_insurance: string;
    eml_currency: string;
    mpl: string;
    mpl_percentage: string;
    mpl_currency: string;
    insured_specification: string;
    power_plant_efficiency: string;
    constructor: string;
    construct_year: string;
    operate_year: string;
    premium: string;
    premium_currency: string;
    send_to_manager: boolean;
    turbine_project: TurbineModel[];
    specialist: UserModel[];
    clause_project: ClauseModel[];
    project_product: ProductModel[];
    cmi_coverage_project: CmiModel[];
}
export interface TicketModel {
    category: "پروژه" | "مالی";
    content: string;
    create_date: string;
    file: string;
    id: number;
    receiver: UserModel[];
    email: string;
    first_name: string;
    last_name: string;
    phone: string;
    username: string;
    seen: boolean;
    seen_time: string;
    sender: UserModel;
    ticket_status: "جدید" | "در حال پیگیری" | "انجام شده";
    title: string;
    update_date: string;
    reply_ticket: TicketModel[];
    can_reply?: boolean;
}
export interface ArticleModel {
    content: string;
    create_date: string;
    file: string;
    id: number;
    title: string;
    update_date: string;
}

export interface CommentModel {
    comment: string;
    date: string;
    id: number;
    name: string;
    email: string;
}

interface WebsiteModel {
    create_date: string;
    id: number;
    update_date: string;
    status: "active";
    user: UserModel;
}

export interface SlideshowModel extends WebsiteModel {
    image: string;
}

export interface ChallengeModel extends WebsiteModel {
    content: string;
    icon: string;
    title: string;
}

export interface ExperienceModel extends WebsiteModel {
    feature_text: string;
    title: string;
}
export interface SolutionModel {
    content: string;
    icon: string;
    title: string;
    id: number;
}

export interface ClientModel {
    id: number;
    logo: string;
    user: number;
}

export interface ServiceModel {
    content: string;
    id: number;
    image: string;
    title: string;
    user: number;
}

export interface AboutusAnualModel {
    content: string;
    id: number;
    user: number;
    year: string;
}

export interface AboutusContentModel {
    content: string;
    id: number;
    user: number;
}

export interface AboutusPartnerModel {
    id: number;
    link: string;
    logo: string;
    user: number;
}

export interface ScenarioModel {
    category: typeof SCENARIO_CATEGORY[number];
    content: string;
    id: number;
    number: string;
    probability_high: number;
    probability_low: number;
    risk_profile_scenario: any[];
    severity_high: number;
    severity_low: number;
}
