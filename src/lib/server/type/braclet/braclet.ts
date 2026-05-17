export interface BracletsResponse {
    current_page: number;
    data: Braclet[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: PaginationLink[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: string;
}

export interface Braclet {
    id: number;
    mac: string;
    status: "on" | "off";
    created_at: string;
    updated_at: string;
    children_id: number;
    children: null; 
    location: {
        id: number;
        lat: number;
        lng: number;
        locationable_type: string;
        locationable_id: number;
        created_at: string;
        updated_at: string;
    };
    circle: {
        id: number;
        radius: number;
        created_at: string;
        updated_at: string;
        braclet_id: number;
    }[];
}

export interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}


export interface CreateBracletRequest {
    mac: string;
    status?: "on" | "off" ; // Optional with default likely being "off"
}

export interface CreateBracletErrorResponse {
    message: string;
    errors?: {
        mac?: string[];
        status?: string[];
    };
}