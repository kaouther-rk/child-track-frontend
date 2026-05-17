'use client';

import { getChildrens } from '@/lib/server/actions/children/getchildrens';
import { Children } from '@/lib/server/type/children/children';
import { createContext, useState, useEffect, ReactNode, useContext } from 'react';

interface ChildrenContextType {
    children: Children[];
    loading: boolean;
    selectedChild: Children | null;
    setSelectedChild: (child: Children | null) => void;
    refreshChildren: () => Promise<void>;
}

export const ChildrenContext = createContext<ChildrenContextType | undefined>(undefined);

export const ChildrenProvider = ({ children }: { children: ReactNode }) => {
    const [state, setState] = useState<{
        children: Children[];
        loading: boolean;
        selectedChild: Children | null;
    }>({
        children: [],
        loading: true,
        selectedChild: null,
    });

    const refreshChildren = async () => {
        setState(prev => ({ ...prev, loading: true }));
        try {
            const data = await getChildrens();
            console.log('Fetched children:', data);
            const locatedChildren = data.data.filter(child => child.braclet?.location != null)
            setState(prev => ({ ...prev, children: locatedChildren }));
        } finally {
            setState(prev => ({ ...prev, loading: false }));
        }
    };

    useEffect(() => {
        refreshChildren();
        // const interval = setInterval(refreshChildren, 5000);
        // return () => clearInterval(interval);
    }, []);

    return (
        <ChildrenContext.Provider value={{
            children: state.children,
            loading: state.loading,
            selectedChild: state.selectedChild,
            setSelectedChild: (child) => setState(prev => ({ ...prev, selectedChild: child })),
            refreshChildren,
        }}>
            {children}
        </ChildrenContext.Provider>
    );
};

export const useChildren = () => {
    const context = useContext(ChildrenContext);
    if (!context) {
        throw new Error('useChildren must be used within a ChildrenProvider');
    }
    return context;
};