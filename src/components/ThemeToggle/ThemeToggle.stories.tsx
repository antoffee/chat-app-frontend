import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';

import { ThemeToggle } from '.';

export default {
    title: 'Components/ThemeToggle',
    component: ThemeToggle,
} as Meta;

export const Default: Story = (args) => <ThemeToggle {...args} />;
Default.args = {};
