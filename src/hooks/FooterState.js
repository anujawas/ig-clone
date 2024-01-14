import { useState } from 'react';

const useActiveTab = (initialTab) => {
    const [activeTab, setActiveTab] = useState(initialTab || null);

    const setActive = (tab) => {
        setActiveTab(tab);
    };

    return { activeTab, setActive };
};

export default useActiveTab;