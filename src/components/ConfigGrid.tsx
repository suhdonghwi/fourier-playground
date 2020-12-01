import React from "react";
import styled from "styled-components/macro";

import Toggle from "react-toggle";
import "react-toggle/style.css";

import Slider from "rc-slider";
import "rc-slider/assets/index.css";

export interface Config {
  isGraphMode: boolean;
  thetaDelta: number;
  circleNum: number;
  drawTrail: boolean;
}

const Grid = styled.div`
  padding: 1.5rem 0;

  display: grid;
  grid-template-columns: 100px 1fr;
  grid-gap: 1rem 1.5rem;

  width: 70%;
`;

const Label = styled.div`
  text-align: center;

  background-color: #ebfbee;
  padding: 0.4rem 0;
  border-radius: 0.2rem;
`;

const Control = styled.div`
  align-self: center;
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
      <Label>자취 표시</Label>
      <Control>
        <Toggle
          checked={config.drawTrail}
          onChange={(e) =>
            changeConfig({ ...config, drawTrail: e.target.checked })
          }
        />
      </Control>
      <Label>각속도</Label>
      <Control>
        <Slider
          min={0.001}
          max={0.025}
          step={0.001}
          value={config.thetaDelta}
          marks={{ "0.001": 0.001, "0.025": 0.025 }}
          onChange={(v) => changeConfig({ ...config, thetaDelta: v })}
        />
      </Control>
      <Label>변환 최고차</Label>
      <Control>
        <Slider
          min={1}
          max={100}
          defaultValue={config.circleNum}
          marks={{ "1": 3, "100": 201 }}
          onAfterChange={(v) => changeConfig({ ...config, circleNum: v })}
        />
      </Control>
    </Grid>
  );
}
