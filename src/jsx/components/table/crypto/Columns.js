import { Link } from 'react-router-dom'
import scam from '../../../../images/product/scam.png'
import warning from '../../../../images/product/warning.png'
import {
  PREFIX_DETAIL,
  CRYPTO,
  CRYPTO_TOKEN
} from '../../../constants/category'
import '../../../../scss/base/table.scss'
import {
  renderNumber,
  formatMoneyLessOneDollar,
  formatMoneyGreaterEqualOneDollar
} from '../../../../utils/formatNumber'
import { NO_DATA } from '../../../constants/data'
import MyScoreComponent from '../../score/scoreComponent'
import Tooltip from '../../tooltip/Tooltip'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const COLUMNS = [
  {
    Header: 'Name',
    Footer: 'Name',
    accessor: 'name',
    Cell: ({ row: { original }}) => (
      <Link
        to={`../../../${PREFIX_DETAIL}/${CRYPTO}/${
          original?.cryptoId?.split('_')[1]
        }/${original?.cryptoId?.split('_')[2]}${
          original?.cryptoId?.split('_')[1] === CRYPTO_TOKEN
            ? `/${original?.cryptoId?.split('_')[3]}`
            : ''
        }`}
        className='data-table image-list'
      >
        {original?.bigLogo ? (
          <img src={original?.bigLogo} alt='avatar' />
        ) : original?.thumbLogo ? (
          <img src={original?.thumbLogo} alt='avatar' />
        ) : original?.smallLogo ? (
          <img src={original?.smallLogo} alt='avatar' />
        ) : (
          <span className='image-list-no-data'>
            {original?.name?.slice(0, 3)}
          </span>
        )}
        <span>
          <div className='data-table-name'>
            <div className='data-table-name-title'>{original?.name}</div>
            <div className='data-table-symbol'>{original?.symbol}</div>
            <div className='image-list-icon-scam-warning'>
              {original?.isScam ? (
                <img src={scam} alt='scam' />
              ) : original?.isWarning ? (
                <img src={warning} alt='scam' />
              ) : (
                ''
              )}
            </div>
          </div>
          {original?.cryptoId?.split('_')[1] === CRYPTO_TOKEN && (
            <div className='crypto-table-info-address'>
              {`${original?.cryptoId
                ?.split('_')[3]
                ?.slice(0, 4)}...${original?.cryptoId
                ?.split('_')[3]
                ?.slice(
                  original?.cryptoId?.split('_')[3]?.length - 4,
                  original?.cryptoId?.split('_')[3]?.length
                )}`}
              {/* <CopyOutlined
                onClick={(e) =>
                  copyAddress(e, original?.cryptoId?.split('_')[3])
                }
              /> */}
            </div>
          )}
        </span>
      </Link>
    )
  },
  {
    Header: 'Price',
    Footer: 'Price',
    accessor: 'priceUSD',
    Cell: ({ row: { original }}) => (
      <div style={{ textAlign: 'right', width: '100%' }}>
        {
          original?.priceUSD && original?.priceUSD >= 1 // format money greater than or equal with 1
            ? formatMoneyGreaterEqualOneDollar(original?.priceUSD)
            : original?.priceUSD > 0 // format money greater than 0
              ? formatMoneyLessOneDollar(original.priceUSD)
              : NO_DATA // money less than or equal with 0
        }
      </div>
    )
  },
  {
    Header: 'Chains',
    Footer: 'Chains',
    accessor: 'chains',
    Cell: ({ row: { original }}) => (
      <button>
        Button text
        {console.log(original)}
      </button>
    )
  },
  {
    Header: 'Exchanges',
    Footer: 'Exchanges',
    accessor: 'exchanges'
  },
  {
    Header: 'Contract',
    Footer: 'Contract',
    accessor: 'contractVerified',
    Cell: ({ row: { original }}) => (
      <Tooltip
        content={original?.contractVerified
          ? `${original?.name} contract has been verified`
          : `${original?.name} contract has not been verified`}
      >
        {original?.contractVerified ? (
          <FontAwesomeIcon icon='fa-regular fa-circle-xmark' />
          // <CheckCircleOutlined
          //   style={{ color: 'green', padding: '0 5px' }}
          // />
        ) : (
          // <CloseCircleOutlined
          //   style={{ color: 'red', padding: '0 5px' }}
          // />
          <>hello</>
        )}
      </Tooltip>
    )
  },
  {
    Header: 'Marketcap',
    Footer: 'Marketcap',
    accessor: 'marketcapUSD',
    Cell: ({ row: { original }}) => (
      <div style={{ textAlign: 'right' }}>
        {original?.marketcapUSD ? renderNumber(original?.marketcapUSD) : NO_DATA}
      </div>
    )
  },
  {
    Header: 'Holders',
    Footer: 'Holders',
    accessor: 'holders',
    Cell: ({ row: { original }}) => (
      <div style={{ textAlign: 'right' }}>
        {new Intl.NumberFormat().format(original?.holders)}
      </div>
    )
  },
  {
    Header: 'Score',
    Footer: 'Score',
    accessor: 'score',
    Cell: ({ row: { original }}) => (
      <MyScoreComponent score={original?.score} />
    )
  }
]

// export const GROUPED_COLUMNS = [
//   {
//     Header: 'Id',
//     Footer: 'Id',
//     accessor: 'id'
//   },
//   {
//     Header: 'Name',
//     Footer: 'Name',
//     columns: [
//       {
//         Header: 'First Name',
//         Footer: 'First Name',
//         accessor: 'first_name'
//       },
//       {
//         Header: 'Last Name',
//         Footer: 'Last Name',
//         accessor: 'last_name'
//       }
//     ]
//   },
//   {
//     Header: 'Info',
//     Footer: 'Info',
//     columns: [
//       {
//         Header: 'Date of  Birth',
//         Footer: 'Date of  Birth',
//         accessor: 'date_of_birth'
//       },
//       {
//         Header: 'Country',
//         Footer: 'Country',
//         accessor: 'country'
//       },
//       {
//         Header: 'Phone',
//         Footer: 'Phone',
//         accessor: 'phone'
//       }
//     ]
//   }
// ]
