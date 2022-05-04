import { render } from '@testing-library/react';
import React from 'react';
import { CreateNewUser } from '../create-new-user';

test('renders correctly', () => {
	const { container } = render(<CreateNewUser />);
	expect(container).toMatchSnapshot();
});
