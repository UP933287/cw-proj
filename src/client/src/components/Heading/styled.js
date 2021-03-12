import styled from 'styled-components';

export const Heading = styled.h2`
    font-family: ${({ theme }) => theme.typography.secondary};
    font-size: ${({ theme }) => theme.typography.large};
`;
