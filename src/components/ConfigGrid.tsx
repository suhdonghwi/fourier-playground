import React from "react";
import styled from "styled-components/macro";

import Toggle from "react-toggle";
import "react-toggle/style.css";

export interface Config {
  isGraphMode: boolean;
}

const Grid = styled.div`
  margin-top: 2rem;
  display: grid;
  grid-template-columns: 100px 1fr;

  width: 70%;
`;

const Label = styled.div`
  font-size: 1.2rem;
  text-align: center;
`;

const Control = styled.div`
  margin: 0 0 auto 0;
`;

interface ConfigGridProps {
  config: Config;
  changeConfig: (config: Config) => void;
}

export default function ConfigGrid({ config, changeConfig }: ConfigGridProps) {
  return (
    <Grid>
      <Label>양함수</Label>
      <Control>
        <Toggle
          checked={config.isGraphMode}
          onChange={(e) =>
            changeConfig({ ...config, isGraphMode: e.target.checked })
          }
        />
      </Control>
    </Grid>
  );
}
