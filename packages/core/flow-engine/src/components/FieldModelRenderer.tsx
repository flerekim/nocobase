/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import type { FlowModelRendererProps } from './FlowModelRenderer';
import { FlowModelRenderer } from './FlowModelRenderer';
import _ from 'lodash';
import React, { useEffect, useMemo } from 'react';

const flowModelRendererPropKeys: (keyof FlowModelRendererProps)[] = [
  'model',
  'uid',
  'fallback',
  'key',
  'showFlowSettings',
  'flowSettingsVariant',
  'hideRemoveInSettings',
  'showTitle',
  'inputArgs',
  'showErrorFallback',
  'settingsMenuLevel',
  'extraToolbarItems',
];

export function FieldModelRenderer(props: any) {
  const { model, ...rest } = props;

  // Keep controlled input state in sync during IME composition. Blocking onChange
  // while composing leaves props.value stale and can make React overwrite the DOM
  // value, cancelling Korean/CJK composition into separated jamo/characters.
  const handleChange = (e: any) => {
    let val;
    if (e && e.target && typeof e.target.value !== 'undefined') {
      val = e.target.value;
    } else if (
      typeof e === 'string' ||
      typeof e === 'number' ||
      typeof e === 'boolean' ||
      (typeof e === 'object' && !(e instanceof Event))
    ) {
      val = e;
    } else {
      val = null;
    }

    model.setProps({ value: val });
    props.onChange?.(val);
  };

  const modelProps = {
    ..._.omit(rest, flowModelRendererPropKeys),
    onChange: handleChange,
  };
  useEffect(() => {
    model && model.setProps(modelProps);
  }, [modelProps]);

  return <FlowModelRenderer model={model} {...rest} />;
}