import { Tab } from './Tab/Tab';

export const TabBar = ({ list = [], handleToggleTab, activeTab, disabled }) => {
  return (
    <>
      {list.map((item, index) => (
        <Tab
          key={item.text}
          onClick={() => {
            handleToggleTab(index);
          }}
          text={item.text}
          aria={item.aria}
          active={activeTab === index ? true : false}
          disabled={disabled}
        />
      ))}
    </>
  );
};
