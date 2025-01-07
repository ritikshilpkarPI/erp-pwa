import './TabSwitch.css';

export const TabSwitch = ({activeTab, setActiveTab}) => {

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="tab-container">
      <div className="tabs">
        <div
          className={`tab ${activeTab === 'UNPAID' ? 'active' : ''}`}
          onClick={() => handleTabClick('UNPAID')}
        >
          UNPAID
        </div>
        <div
          className={`tab ${activeTab === 'PAID' ? 'active' : ''}`}
          onClick={() => handleTabClick('PAID')}
        >
          PAID
        </div>
        <div
          className={`tab ${activeTab === 'ALL' ? 'active' : ''}`}
          onClick={() => handleTabClick('ALL')}
        >
          ALL
        </div>
      </div>
    </div>
  );
};
