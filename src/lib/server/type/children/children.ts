export interface ChildrenResponse {
    current_page: number;
    data: Children[];
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
    total: number;
}

export interface Children {
    id: number;
    username: string;
    name: string;
    last: string;
    date_of_birth: string; // Format: YYYY-MM-DD
    description: string;
    created_at: string;
    updated_at: string;
    gurdian_id: number;
    baladya_id: number;
    braclet: Braclet | null;
    gurdian: {
        id: number;
        username: string;
        name: string;
        last: string;
        date_of_birth: string;
        created_at: string;
        updated_at: string;
        baladya_id: number;
    };
    baladya: {
        id: number;
        name: string;
        created_at: string;
        updated_at: string;
        wilaya_id: number;
        wilaya: {
            id: number;
            name: string;
            created_at: string;
            updated_at: string;
        };
    };
}

export interface Braclet {
    id: number;
    mac: string;
    status: "on" | "off";
    created_at: string;
    updated_at: string;
    children_id: number;
    dangers: {
        id: number;
        name: string;
        created_at: string;
        updated_at: string;
        braclet_id: string;
        location: {
            id: number;
            lat: number;
            lng: number;
            locationable_type: string;
            locationable_id: number;
            created_at: string;
            updated_at: string;
        }
    }[];
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
        location: {
            id: number;
            lat: number;
            lng: number;
            locationable_type: string;
            locationable_id: number;
            created_at: string;
            updated_at: string;
        };
    };
}

export interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

// Request Payload
export interface CreateChildrenRequest {
    name: string;
    last: string;
    date_of_birth: string; // Format: YYYY-MM-DD
    description: string;
    baladya_id: string;
}

// Success Response
export interface CreateChildSuccessResponse {
    message: string;
    data: Children;
}

// Error Response
export interface CreateChildrenErrorResponse {
    message: string;
    errors: {
        name?: string[];
        last?: string[];
        date_of_birth?: string[];
        description?: string[];
        baladya_id?: string[];
    };
}