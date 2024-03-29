import React from 'react';
import styled from 'styled-components/macro';

import { COLORS, WEIGHTS } from '../../constants';
import { formatPrice, pluralize, isNewShoe } from '../../utils';
import Spacer from '../Spacer';

const ShoeCard = ({
	slug,
	name,
	imageSrc,
	price,
	salePrice,
	releaseDate,
	numOfColors,
}) => {
	// There are 3 variants possible, based on the props:
	//   - new-release
	//   - on-sale
	//   - default
	//
	// Any shoe released in the last month will be considered
	// `new-release`. Any shoe with a `salePrice` will be
	// on-sale. In theory, it is possible for a shoe to be
	// both on-sale and new-release, but in this case, `on-sale`
	// will triumph and be the variant used.
	// prettier-ignore
	const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

	return (
		<Link href={`/shoe/${slug}`}>
			<Wrapper>
        <Flag variant={variant}>{variant === 'on-sale' ? 'Sale' :'Just Released!'}</Flag>
				<ImageWrapper>
					<Image alt='' src={imageSrc} />
				</ImageWrapper>
				<Spacer size={12} />
				<Row>
					<Name>{name}</Name>
					<Price>{formatPrice(price)}</Price>
				</Row>
				<Row>
					<ColorInfo>{pluralize('Color', numOfColors)}</ColorInfo>
				</Row>
			</Wrapper>
		</Link>
	);
};

const Flag = styled.div`
  display: ${props => props.variant === 'default' ? "none" : "auto"};
  background-color: ${props => props.variant === 'on-sale' ? "hsla(240, 60%, 63%, 1)" : "hsla(340, 65%, 47%, 1)"};
  color: white;
  border-radius: 2px;
  position: absolute;  
  right: -4px;
  top: 10px;
  z-index: 1;
  padding: 8px;
  font-size: 0.75rem;
`
const Link = styled.a`
	text-decoration: none;
	color: inherit;
`;

const Wrapper = styled.article`
  display: flex;
  flex-direction: column;
  position: relative;
  font-size: 1rem;`
  ;


const ImageWrapper = styled.div`
	position: relative;
	width: 300px;
  border-radius: 20px;
`;

const Image = styled.img`
	width: 100%;
  border-radius: inherit;
`;

const Row = styled.div`	
  display: flex;
  justify-content: space-between;
`;

const Name = styled.h3`
	font-weight: ${WEIGHTS.medium};
	color: ${COLORS.gray[900]};
`;

const Price = styled.span``;

const ColorInfo = styled.p`
	color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
	font-weight: ${WEIGHTS.medium};
	color: ${COLORS.primary};
`;

export default ShoeCard;
