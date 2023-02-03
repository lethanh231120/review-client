import React from 'react'
// import { Dropdown } from 'react-bootstrap'
import { Avatar, Image } from 'antd'
// import { Link } from 'react-router-dom'
import CoinChart from '../../charts/coinchart/CoinChart'
import Description from '../description/Description'
import {
  CopyOutlined,
  GlobalOutlined,
  DownOutlined,
  LinkOutlined
} from '@ant-design/icons'
import './crypto.scss'
import _ from 'lodash'
import ScamWarningDetail from '../scam-warning/ScamWarningDetail'

const productInfo = {
  'details': {
    'id': 'f2d36e16-2bcc-4bd4-b4a0-e86705da819d',
    'cryptoId': 'gear5_token_ethereum_0xdac17f958d2ee523a2206206994597c13d831ec7',
    'cryptoSrc': null,
    'cryptoCode': null,
    'name': 'Tether',
    'symbol': 'USDT',
    'decimal': 6,
    'address': '0xdac17f958d2ee523a2206206994597c13d831ec7',
    'contractCreator': null,
    'thumbLogo': 'https://assets.coingecko.com/coins/images/325/thumb/Tether.png?1668148663',
    'smallLogo': 'https://assets.coingecko.com/coins/images/325/small/Tether.png?1668148663',
    'bigLogo': 'https://assets.coingecko.com/coins/images/325/large/Tether.png?1668148663',
    'chainId': '1',
    'chainName': 'ethereum',
    'subcategory': 'Harmony Ecosystem, Avalanche Ecosystem, Polygon Ecosystem, Moonbeam Ecosystem, Fantom Ecosystem, Near Protocol Ecosystem, Arbitrum Ecosystem, Stablecoins, Moonriver Ecosystem, Stablecoins, Gnosis Ecosystem, Binance Ecosystem, Tezos Ecosystem, Ethereum Ecosystem, Cronos Ecosystem, Optimism Ecosystem, Metis Ecosystem, Velas Ecosystem, EthereumPoW Ecosystem',
    'description': 'Tether (USDT) is a cryptocurrency with a value meant to mirror the value of the U.S. dollar. The idea was to create a stable cryptocurrency that can be used like digital dollars. Coins that serve this purpose of being a stable dollar substitute are called “stable coins.” Tether is the most popular stable coin and even acts as a dollar replacement on many popular exchanges! According to their site, Tether converts cash into digital currency, to anchor or “tether” the value of the coin to the price of national currencies like the US dollar, the Euro, and the Yen. Like other cryptos it uses blockchain. Unlike other cryptos, it is [according to the official Tether site] “100% backed by USD” (USD is held in reserve). The primary use of Tether is that it offers some stability to the otherwise volatile crypto space and offers liquidity to exchanges who can’t deal in dollars and with banks (for example to the sometimes controversial but leading exchange Bitfinex).\r\n\r\nThe digital coins are issued by a company called Tether Limited that is governed by the laws of the British Virgin Islands, according to the legal part of its website. It is incorporated in Hong Kong. It has emerged that Jan Ludovicus van der Velde is the CEO of cryptocurrency exchange Bitfinex, which has been accused of being involved in the price manipulation of bitcoin, as well as tether. Many people trading on exchanges, including Bitfinex, will use tether to buy other cryptocurrencies like bitcoin. Tether Limited argues that using this method to buy virtual currencies allows users to move fiat in and out of an exchange more quickly and cheaply. Also, exchanges typically have rocky relationships with banks, and using Tether is a way to circumvent that.\r\n\r\nUSDT is fairly simple to use. Once on exchanges like Poloniex or Bittrex, it can be used to purchase Bitcoin and other cryptocurrencies. It can be easily transferred from an exchange to any Omni Layer enabled wallet. Tether has no transaction fees, although external wallets and exchanges may charge one. In order to convert USDT to USD and vise versa through the Tether.to Platform, users must pay a small fee. Buying and selling Tether for Bitcoin can be done through a variety of exchanges like the ones mentioned previously or through the Tether.to platform, which also allows the conversion between USD to and from your bank account.',
    'score': 76,
    'socials': {
      'discord': '',
      'explorer': 'https://etherscan.io/token/0xdac17f958d2ee523a2206206994597c13d831ec7',
      'facebook': '',
      'instagram': '',
      'medium': '',
      'reddit': '',
      'twitter': '',
      'website': 'https://tether.to/'
    },
    'scamDate': null,
    'isScam': false,
    'isVerifiedByAdmin': false,
    'isShow': true,
    'isWarning': false,
    'isProxy': false,
    'objectReference': null,
    'proof': null,
    'sourceUrl': null,
    'totalReviews': 0,
    'totalIsScam': 0,
    'totalNotScam': 0,
    'star': 0,
    'notice': null,
    'reputation': 0,
    'website': 'https://tether.to/',
    'explorer': 'https://etherscan.io/token/0xdac17f958d2ee523a2206206994597c13d831ec7',
    'multichain': [
      {
        'cryptoId': 'gear5_token_hoo_0xd16babe52980554520f6da505df4d1b124c815a7',
        'cryptoSrc': 'coinmarketcap',
        'symbol': 'USDT',
        'decimal': null,
        'address': '0xd16babe52980554520f6da505df4d1b124c815a7',
        'chainName': 'hoo'
      },
      {
        'cryptoId': 'gear5_token_tezos_kt1xntn74butxhfdtbmm2bgzaqfhpbvkwr8o',
        'cryptoSrc': 'coinmarketcap',
        'symbol': 'USDT',
        'decimal': null,
        'address': 'KT1XnTn74bUtxHfDtBmm2bGZAQfhPbvKWR8o',
        'chainName': 'tezos'
      },
      {
        'cryptoId': 'gear5_token_avalanche_0x9702230a8ea53601f5cd2dc00fdbc13d4df4a8c7',
        'cryptoSrc': 'coingecko',
        'symbol': 'USDT',
        'decimal': 6,
        'address': '0x9702230a8ea53601f5cd2dc00fdbc13d4df4a8c7',
        'chainName': 'avalanche'
      },
      {
        'cryptoId': 'gear5_token_moonriver_0xb44a9b6905af7c801311e8f4e76932ee959c663c',
        'cryptoSrc': 'coingecko',
        'symbol': 'USDT',
        'decimal': 6,
        'address': '0xb44a9b6905af7c801311e8f4e76932ee959c663c',
        'chainName': 'moonriver'
      },
      {
        'cryptoId': 'gear5_token_boba_0x5de1677344d3cb0d7d465c10b72a8f60699c062d',
        'cryptoSrc': 'coingecko',
        'symbol': 'USDT',
        'decimal': 6,
        'address': '0x5de1677344d3cb0d7d465c10b72a8f60699c062d',
        'chainName': 'boba'
      },
      {
        'cryptoId': 'gear5_token_cardano_0x3795c36e7d12a8c252a20c5a7b455f7c57b60283',
        'cryptoSrc': 'coinmarketcap',
        'symbol': 'USDT',
        'decimal': null,
        'address': '0x3795c36e7d12a8c252a20c5a7b455f7c57b60283',
        'chainName': 'cardano'
      },
      {
        'cryptoId': 'gear5_token_fuse_0xfadbbf8ce7d5b7041be672561bba99f79c532e10',
        'cryptoSrc': 'coingecko',
        'symbol': 'USDT',
        'decimal': 6,
        'address': '0xfadbbf8ce7d5b7041be672561bba99f79c532e10',
        'chainName': 'fuse'
      },
      {
        'cryptoId': 'gear5_token_oasis_0xdc3af65ecbd339309ec55f109cb214e0325c5ed4',
        'cryptoSrc': 'coingecko',
        'symbol': 'USDT',
        'decimal': 18,
        'address': '0xdc3af65ecbd339309ec55f109cb214e0325c5ed4',
        'chainName': 'oasis'
      },
      {
        'cryptoId': 'gear5_token_polygon_0xc2132d05d31c914a87c6611c10748aeb04b58e8f',
        'cryptoSrc': 'coingecko',
        'symbol': 'USDT',
        'decimal': 6,
        'address': '0xc2132d05d31c914a87c6611c10748aeb04b58e8f',
        'chainName': 'polygon'
      },
      {
        'cryptoId': 'gear5_token_optimism_0x94b008aa00579c1307b0ef2c499ad98a8ce58e58',
        'cryptoSrc': 'coingecko',
        'symbol': 'USDT',
        'decimal': 6,
        'address': '0x94b008aa00579c1307b0ef2c499ad98a8ce58e58',
        'chainName': 'optimism'
      },
      {
        'cryptoId': 'gear5_token_syscoin_0x922d641a426dcffaef11680e5358f34d97d112e1',
        'cryptoSrc': 'coingecko',
        'symbol': 'USDT',
        'decimal': 6,
        'address': '0x922d641a426dcffaef11680e5358f34d97d112e1',
        'chainName': 'syscoin'
      },
      {
        'cryptoId': 'gear5_token_astar_0x3795c36e7d12a8c252a20c5a7b455f7c57b60283',
        'cryptoSrc': 'coingecko',
        'symbol': 'USDT',
        'decimal': 6,
        'address': '0x3795c36e7d12a8c252a20c5a7b455f7c57b60283',
        'chainName': 'astar'
      },
      {
        'cryptoId': 'gear5_token_bitgert_0xde14b85cf78f2add2e867fee40575437d5f10c06',
        'cryptoSrc': 'coingecko',
        'symbol': 'USDT',
        'decimal': 18,
        'address': '0xde14b85cf78f2add2e867fee40575437d5f10c06',
        'chainName': 'bitgert'
      },
      {
        'cryptoId': 'gear5_token_kava_0xb44a9b6905af7c801311e8f4e76932ee959c663c',
        'cryptoSrc': 'coingecko',
        'symbol': 'USDT',
        'decimal': 6,
        'address': '0xb44a9b6905af7c801311e8f4e76932ee959c663c',
        'chainName': 'kava'
      },
      {
        'cryptoId': 'gear5_token_kucoin_0x0039f574ee5cc39bdd162e9a88e3eb1f111baf48',
        'cryptoSrc': 'coingecko',
        'symbol': 'USDT',
        'decimal': 18,
        'address': '0x0039f574ee5cc39bdd162e9a88e3eb1f111baf48',
        'chainName': 'kucoin'
      },
      {
        'cryptoId': 'gear5_token_milkomeda_0x80a16016cc4a2e6a2caca8a4a498b1699ff0f844',
        'cryptoSrc': 'coingecko',
        'symbol': 'USDT',
        'decimal': 6,
        'address': '0x80a16016cc4a2e6a2caca8a4a498b1699ff0f844',
        'chainName': 'milkomeda'
      },
      {
        'cryptoId': 'gear5_token_solana_es9vmfrzacermjfrf4h2fyd4kconky11mcce8benwnyb',
        'cryptoSrc': 'coingecko',
        'symbol': 'USDT',
        'decimal': 6,
        'address': 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB',
        'chainName': 'solana'
      },
      {
        'cryptoId': 'gear5_token_telos_0xefaeee334f0fd1712f9a8cc375f427d9cdd40d73',
        'cryptoSrc': 'coingecko',
        'symbol': 'USDT',
        'decimal': 18,
        'address': '0xefaeee334f0fd1712f9a8cc375f427d9cdd40d73',
        'chainName': 'telos'
      },
      {
        'cryptoId': 'gear5_token_zilliqa_zil1sxx29cshups269ahh5qjffyr58mxjv9ft78jqy',
        'cryptoSrc': 'coinmarketcap',
        'symbol': 'USDT',
        'decimal': null,
        'address': 'zil1sxx29cshups269ahh5qjffyr58mxjv9ft78jqy',
        'chainName': 'zilliqa'
      },
      {
        'cryptoId': 'gear5_token_aptos_0xf22bede237a07e121b56d91a491eb7bcdfd1f5907926a9e58338f964a01b17fa::asset::usdt',
        'cryptoSrc': 'coinmarketcap',
        'symbol': 'USDT',
        'decimal': null,
        'address': '0xf22bede237a07e121b56d91a491eb7bcdfd1f5907926a9e58338f964a01b17fa::asset::USDT',
        'chainName': 'aptos'
      },
      {
        'cryptoId': 'gear5_token_everscale_0:a519f99bb5d6d51ef958ed24d337ad75a1c770885dcd42d51d6663f9fcdacfb2',
        'cryptoSrc': 'coinmarketcap',
        'symbol': 'USDT',
        'decimal': null,
        'address': '0:a519f99bb5d6d51ef958ed24d337ad75a1c770885dcd42d51d6663f9fcdacfb2',
        'chainName': 'everscale'
      },
      {
        'cryptoId': 'gear5_token_erc-20_0x73e84bfd35c3f1537a72180d1481e1eabf64b70b',
        'cryptoSrc': 'coinmarketcap',
        'symbol': 'USDT',
        'decimal': null,
        'address': '0x73e84bfd35c3f1537a72180d1481e1eabf64b70b',
        'chainName': 'ERC-20'
      },
      {
        'cryptoId': 'gear5_token_bitcoin_0xbc2f884680c95a02cea099da2f524b366d9028ba',
        'cryptoSrc': 'coinmarketcap',
        'symbol': 'USDT',
        'decimal': null,
        'address': '0xBc2F884680c95A02cea099dA2F524b366d9028Ba',
        'chainName': 'bitcoin'
      },
      {
        'cryptoId': 'gear5_token_metisdao_0xbb06dca3ae6887fabf931640f67cab3e3a16f4dc',
        'cryptoSrc': 'coinmarketcap',
        'symbol': 'USDT',
        'decimal': null,
        'address': '0xbb06dca3ae6887fabf931640f67cab3e3a16f4dc',
        'chainName': 'metisdao'
      },
      {
        'cryptoId': 'gear5_token_cube_0x79f1520268a20c879ef44d169a4e3812d223c6de',
        'cryptoSrc': 'coinmarketcap',
        'symbol': 'USDT',
        'decimal': null,
        'address': '0x79F1520268A20c879EF44d169A4E3812D223C6de',
        'chainName': 'cube'
      },
      {
        'cryptoId': 'gear5_token_secret_secret18wpjn83dayu4meu6wnn29khfkwdxs7kyrz9c8f',
        'cryptoSrc': 'coinmarketcap',
        'symbol': 'USDT',
        'decimal': null,
        'address': 'secret18wpjn83dayu4meu6wnn29khfkwdxs7kyrz9c8f',
        'chainName': 'secret'
      },
      {
        'cryptoId': 'gear5_token_waves_34n9yceetlwn93qyq64esp1x89tsruju44rremsxxepj',
        'cryptoSrc': 'coinmarketcap',
        'symbol': 'USDT',
        'decimal': null,
        'address': '34N9YcEETLWn93qYQ64EsP1x89tSruJU44RrEMSXXEPJ',
        'chainName': 'waves'
      },
      {
        'cryptoId': 'gear5_token_okt_0x382bb369d343125bfb2117af9c149795c6c65c50',
        'cryptoSrc': 'coinmarketcap',
        'symbol': 'USDT',
        'decimal': null,
        'address': '0x382bb369d343125bfb2117af9c149795c6c65c50',
        'chainName': 'okt'
      },
      {
        'cryptoId': 'gear5_token_algorand_312769',
        'cryptoSrc': 'coinmarketcap',
        'symbol': 'USDT',
        'decimal': null,
        'address': '312769',
        'chainName': 'algorand'
      },
      {
        'cryptoId': 'gear5_token_okex_0x382bb369d343125bfb2117af9c149795c6c65c50',
        'cryptoSrc': 'coingecko',
        'symbol': 'USDT',
        'decimal': 6,
        'address': '0x382bb369d343125bfb2117af9c149795c6c65c50',
        'chainName': 'okex'
      },
      {
        'cryptoId': 'gear5_token_harmony_0x3c2b8be99c50593081eaa2a724f0b8285f5aba8f',
        'cryptoSrc': 'coingecko',
        'symbol': 'USDT',
        'decimal': 6,
        'address': '0x3c2b8be99c50593081eaa2a724f0b8285f5aba8f',
        'chainName': 'harmony'
      },
      {
        'cryptoId': 'gear5_token_bitrise_0xe3f5a90f9cb311505cd691a46596599aa1a0ad7d',
        'cryptoSrc': 'coinmarketcap',
        'symbol': 'USDT',
        'decimal': null,
        'address': '0xE3F5a90F9cb311505cd691a46596599aA1A0AD7D',
        'chainName': 'bitrise'
      },
      {
        'cryptoId': 'gear5_token_velas_0xb44a9b6905af7c801311e8f4e76932ee959c663c',
        'cryptoSrc': 'coingecko',
        'symbol': 'USDT',
        'decimal': 6,
        'address': '0xb44a9b6905af7c801311e8f4e76932ee959c663c',
        'chainName': 'velas'
      },
      {
        'cryptoId': 'gear5_token_moonbeam_0xefaeee334f0fd1712f9a8cc375f427d9cdd40d73',
        'cryptoSrc': 'coingecko',
        'symbol': 'USDT',
        'decimal': 6,
        'address': '0xefaeee334f0fd1712f9a8cc375f427d9cdd40d73',
        'chainName': 'moonbeam'
      },
      {
        'cryptoId': 'gear5_token_fantom_0x049d68029688eabf473097a2fc38ef61633a3c7a',
        'cryptoSrc': 'coingecko',
        'symbol': 'USDT',
        'decimal': 6,
        'address': '0x049d68029688eabf473097a2fc38ef61633a3c7a',
        'chainName': 'fantom'
      },
      {
        'cryptoId': 'gear5_token_canto_0xd567b3d7b8fe3c79a1ad8da978812cfc4fa05e75',
        'cryptoSrc': 'coingecko',
        'symbol': 'USDT',
        'decimal': 6,
        'address': '0xd567b3d7b8fe3c79a1ad8da978812cfc4fa05e75',
        'chainName': 'canto'
      },
      {
        'cryptoId': 'gear5_token_huobi_0xa71edc38d189767582c38a3145b5873052c3e47a',
        'cryptoSrc': 'coingecko',
        'symbol': 'USDT',
        'decimal': 18,
        'address': '0xa71edc38d189767582c38a3145b5873052c3e47a',
        'chainName': 'huobi'
      },
      {
        'cryptoId': 'gear5_token_meter_0x5fa41671c48e3c951afc30816947126ccc8c162e',
        'cryptoSrc': 'coingecko',
        'symbol': 'USDT',
        'decimal': 6,
        'address': '0x5fa41671c48e3c951afc30816947126ccc8c162e',
        'chainName': 'meter'
      },
      {
        'cryptoId': 'gear5_token_tomochain_0x381b31409e4d220919b2cff012ed94d70135a59e',
        'cryptoSrc': 'coingecko',
        'symbol': 'USDT',
        'decimal': 6,
        'address': '0x381b31409e4d220919b2cff012ed94d70135a59e',
        'chainName': 'tomochain'
      },
      {
        'cryptoId': 'gear5_token_metis_0xbb06dca3ae6887fabf931640f67cab3e3a16f4dc',
        'cryptoSrc': 'coingecko',
        'symbol': 'USDT',
        'decimal': 6,
        'address': '0xbb06dca3ae6887fabf931640f67cab3e3a16f4dc',
        'chainName': 'metis'
      },
      {
        'cryptoId': 'gear5_token_xdai_0x4ecaba5870353805a9f068101a40e0f32ed605c6',
        'cryptoSrc': 'coingecko',
        'symbol': 'USDT',
        'decimal': 6,
        'address': '0x4ecaba5870353805a9f068101a40e0f32ed605c6',
        'chainName': 'xdai'
      },
      {
        'cryptoId': 'gear5_token_ethereumpow_0x2ad7868ca212135c6119fd7ad1ce51cfc5702892',
        'cryptoSrc': 'coingecko',
        'symbol': 'USDT',
        'decimal': null,
        'address': '0x2ad7868ca212135c6119fd7ad1ce51cfc5702892',
        'chainName': 'ethereumpow'
      },
      {
        'cryptoId': 'gear5_token_tron_tr7nhqjekqxgtci8q8zy4pl8otszgjlj6t',
        'cryptoSrc': 'coingecko',
        'symbol': 'USDT',
        'decimal': 6,
        'address': 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t',
        'chainName': 'tron'
      },
      {
        'cryptoId': 'gear5_token_aurora_0x4988a896b1227218e4a686fde5eabdcabd91571f',
        'cryptoSrc': 'coingecko',
        'symbol': 'USDT',
        'decimal': 6,
        'address': '0x4988a896b1227218e4a686fde5eabdcabd91571f',
        'chainName': 'aurora'
      },
      {
        'cryptoId': 'gear5_token_conflux_0xfe97e85d13abd9c1c33384e796f10b73905637ce',
        'cryptoSrc': 'coingecko',
        'symbol': 'USDT',
        'decimal': 18,
        'address': '0xfe97e85d13abd9c1c33384e796f10b73905637ce',
        'chainName': 'conflux'
      },
      {
        'cryptoId': 'gear5_token_cronos_0x66e428c3f67a68878562e79a0234c1f83c208770',
        'cryptoSrc': 'coingecko',
        'symbol': 'USDT',
        'decimal': 6,
        'address': '0x66e428c3f67a68878562e79a0234c1f83c208770',
        'chainName': 'cronos'
      },
      {
        'cryptoId': 'gear5_token_thundercore_0x4f3c8e20942461e2c3bdd8311ac57b0c222f2b82',
        'cryptoSrc': 'coinmarketcap',
        'symbol': 'USDT',
        'decimal': null,
        'address': '0x4f3c8e20942461e2c3bdd8311ac57b0c222f2b82',
        'chainName': 'thundercore'
      },
      {
        'cryptoId': 'gear5_token_rsk_0xef213441a85df4d7acbdae0cf78004e1e486bb96',
        'cryptoSrc': 'coinmarketcap',
        'symbol': 'USDT',
        'decimal': null,
        'address': '0xef213441a85df4d7acbdae0cf78004e1e486bb96',
        'chainName': 'rsk'
      },
      {
        'cryptoId': 'gear5_token_gnosis_0x4ecaba5870353805a9f068101a40e0f32ed605c6',
        'cryptoSrc': 'coinmarketcap',
        'symbol': 'USDT',
        'decimal': null,
        'address': '0x4ecaba5870353805a9f068101a40e0f32ed605c6',
        'chainName': 'gnosis'
      },
      {
        'cryptoId': 'gear5_token_klaytn_0xcee8faf64bb97a73bb51e115aa89c17ffa8dd167',
        'cryptoSrc': 'coinmarketcap',
        'symbol': 'USDT',
        'decimal': null,
        'address': '0xcee8faf64bb97a73bb51e115aa89c17ffa8dd167',
        'chainName': 'klaytn'
      },
      {
        'cryptoId': 'gear5_token_fusion_0x9636d3294e45823ec924c8d89dd1f1dffcf044e6',
        'cryptoSrc': 'coinmarketcap',
        'symbol': 'USDT',
        'decimal': null,
        'address': '0x9636d3294e45823ec924c8d89dd1f1dffcf044e6',
        'chainName': 'fusion'
      },
      {
        'cryptoId': 'gear5_token_dogecoin_0xe3f5a90f9cb311505cd691a46596599aa1a0ad7d',
        'cryptoSrc': 'coinmarketcap',
        'symbol': 'USDT',
        'decimal': null,
        'address': '0xe3f5a90f9cb311505cd691a46596599aa1a0ad7d',
        'chainName': 'dogecoin'
      },
      {
        'cryptoId': 'gear5_token_arbitrum_0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9',
        'cryptoSrc': 'coingecko',
        'symbol': 'USDT',
        'decimal': 6,
        'address': '0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9',
        'chainName': 'arbitrum'
      },
      {
        'cryptoId': 'gear5_token_kardiachain_0x551a5dcac57c66aa010940c2dcff5da9c53aa53b',
        'cryptoSrc': 'coingecko',
        'symbol': 'USDT',
        'decimal': 18,
        'address': '0x551a5dcac57c66aa010940c2dcff5da9c53aa53b',
        'chainName': 'kardiachain'
      },
      {
        'cryptoId': 'gear5_token_near_dac17f958d2ee523a2206206994597c13d831ec7.factory.bridge.near',
        'cryptoSrc': 'coingecko',
        'symbol': 'USDT',
        'decimal': null,
        'address': 'dac17f958d2ee523a2206206994597c13d831ec7.factory.bridge.near',
        'chainName': 'near'
      },
      {
        'cryptoId': 'gear5_token_ethereum_0xdac17f958d2ee523a2206206994597c13d831ec7',
        'cryptoSrc': 'coingecko',
        'symbol': 'USDT',
        'decimal': 6,
        'address': '0xdac17f958d2ee523a2206206994597c13d831ec7',
        'chainName': 'ethereum'
      },
      {
        'cryptoId': 'gear5_token_iotex_0x3cdb7c48e70b854ed2fa392e21687501d84b3afc',
        'cryptoSrc': 'coingecko',
        'symbol': 'USDT',
        'decimal': null,
        'address': '0x3cdb7c48e70b854ed2fa392e21687501d84b3afc',
        'chainName': 'iotex'
      },
      {
        'cryptoId': 'gear5_token_binance_0x55d398326f99059ff775485246999027b3197955',
        'cryptoSrc': 'coingecko',
        'symbol': 'USDT',
        'decimal': 18,
        'address': '0x55d398326f99059ff775485246999027b3197955',
        'chainName': 'binance'
      }
    ],
    'marketcapUSD': 68045669682,
    'totalSupply': '68028597303.9809',
    'priceUSD': 1.001,
    'holders': 3967889,
    'transfers': 171286737,
    'isCoingecko': true,
    'isCoinmarketcap': true,
    'isBinance': true,
    'isCoinbase': true,
    'isPancakeSwap': true,
    'isUniSwap': true,
    'isDex': true,
    'isHacked': null,
    'contractVerified': true,
    'senders': 24235229,
    'receivers': 26735570,
    'createdTime': null,
    'createdDate': '2023-01-14T06:01:18.091073Z',
    'updatedDate': '2023-02-03T10:25:29.506Z',
    'type': 'token',
    'totalLpUSD': 168777382.079295,
    'wrapTokenId': null,
    'sourceCode': {},
    'community': {
      'discord': '',
      'explorer': 'https://etherscan.io/token/0xdac17f958d2ee523a2206206994597c13d831ec7',
      'facebook': '',
      'instagram': '',
      'medium': '',
      'reddit': '',
      'twitter': '',
      'website': 'https://tether.to/'
    },
    'exchanges': [
      'https://gear5.s3.ap-northeast-1.amazonaws.com/image/exchange/smallLogo/gear5_exchange_binance.png',
      'https://gear5.s3.ap-northeast-1.amazonaws.com/image/exchange/smallLogo/gear5_exchange_coinbase-pro.png',
      'https://gear5.s3.ap-northeast-1.amazonaws.com/image/exchange/smallLogo/gear5_exchange_pancake-swap.png',
      'https://gear5.s3.ap-northeast-1.amazonaws.com/image/exchange/smallLogo/gear5_exchange_uniswap-v2.png'
    ]
  },
  'mores': {
    'fund': null,
    'roundSale': null,
    'tag': [
      {
        'id': 'f5df2d05-8d52-4e5f-96ef-07e02ff29fac',
        'name': 'Near Protocol Ecosystem',
        'productId': 'gear5_token_ethereum_0xdac17f958d2ee523a2206206994597c13d831ec7',
        'type': 'token'
      }
    ]
  },
  'reviews': null
}

const multichain = [
  {
    'chainId': '70',
    'chainName': 'hoo',
    'exploreWebsite': 'https://www.hooscan.com',
    'path': '/token/',
    'image': 'https://gear5.s3.ap-northeast-1.amazonaws.com/image/chain/smallLogo/hoo.png',
    'cryptoId': 'gear5_token_hoo_0xd16babe52980554520f6da505df4d1b124c815a7',
    'cryptoSrc': 'coinmarketcap',
    'symbol': 'USDT',
    'decimal': null,
    'address': '0xd16babe52980554520f6da505df4d1b124c815a7'
  },
  {
    'chainId': '43114',
    'chainName': 'avalanche',
    'exploreWebsite': 'https://snowtrace.io',
    'path': '/token/',
    'image': 'https://gear5.s3.ap-northeast-1.amazonaws.com/image/chain/smallLogo/avalanche.png',
    'cryptoId': 'gear5_token_avalanche_0x9702230a8ea53601f5cd2dc00fdbc13d4df4a8c7',
    'cryptoSrc': 'coingecko',
    'symbol': 'USDT',
    'decimal': 6,
    'address': '0x9702230a8ea53601f5cd2dc00fdbc13d4df4a8c7'
  },
  {
    'chainId': '1285',
    'chainName': 'moonriver',
    'exploreWebsite': 'https://moonriver.moonscan.io',
    'path': '/token/',
    'image': 'https://gear5.s3.ap-northeast-1.amazonaws.com/image/chain/smallLogo/moonriver.png',
    'cryptoId': 'gear5_token_moonriver_0xb44a9b6905af7c801311e8f4e76932ee959c663c',
    'cryptoSrc': 'coingecko',
    'symbol': 'USDT',
    'decimal': 6,
    'address': '0xb44a9b6905af7c801311e8f4e76932ee959c663c'
  },
  {
    'chainId': '288',
    'chainName': 'boba',
    'exploreWebsite': 'https://bobascan.com',
    'path': '/token/',
    'image': 'https://gear5.s3.ap-northeast-1.amazonaws.com/image/chain/smallLogo/boba.png',
    'cryptoId': 'gear5_token_boba_0x5de1677344d3cb0d7d465c10b72a8f60699c062d',
    'cryptoSrc': 'coingecko',
    'symbol': 'USDT',
    'decimal': 6,
    'address': '0x5de1677344d3cb0d7d465c10b72a8f60699c062d'
  },
  {
    'chainId': null,
    'chainName': 'cardano',
    'exploreWebsite': 'https://cardanoscan.io',
    'path': '/address/',
    'image': 'https://gear5.s3.ap-northeast-1.amazonaws.com/image/chain/smallLogo/cardano.png',
    'cryptoId': 'gear5_token_cardano_0x3795c36e7d12a8c252a20c5a7b455f7c57b60283',
    'cryptoSrc': 'coinmarketcap',
    'symbol': 'USDT',
    'decimal': null,
    'address': '0x3795c36e7d12a8c252a20c5a7b455f7c57b60283'
  },
  {
    'chainId': '122',
    'chainName': 'fuse',
    'exploreWebsite': 'https://explorer.fuse.io',
    'path': '/token/',
    'image': 'https://gear5.s3.ap-northeast-1.amazonaws.com/image/chain/smallLogo/fuse.png',
    'cryptoId': 'gear5_token_fuse_0xfadbbf8ce7d5b7041be672561bba99f79c532e10',
    'cryptoSrc': 'coingecko',
    'symbol': 'USDT',
    'decimal': 6,
    'address': '0xfadbbf8ce7d5b7041be672561bba99f79c532e10'
  },
  {
    'chainId': '42262',
    'chainName': 'oasis',
    'exploreWebsite': 'https://www.oasisscan.com/',
    'path': '/token/',
    'image': 'https://gear5.s3.ap-northeast-1.amazonaws.com/image/chain/smallLogo/oasis.png',
    'cryptoId': 'gear5_token_oasis_0xdc3af65ecbd339309ec55f109cb214e0325c5ed4',
    'cryptoSrc': 'coingecko',
    'symbol': 'USDT',
    'decimal': 18,
    'address': '0xdc3af65ecbd339309ec55f109cb214e0325c5ed4'
  },
  {
    'chainId': '137',
    'chainName': 'polygon',
    'exploreWebsite': 'https://polygonscan.com',
    'path': '/token/',
    'image': 'https://gear5.s3.ap-northeast-1.amazonaws.com/image/chain/smallLogo/polygon.png',
    'cryptoId': 'gear5_token_polygon_0xc2132d05d31c914a87c6611c10748aeb04b58e8f',
    'cryptoSrc': 'coingecko',
    'symbol': 'USDT',
    'decimal': 6,
    'address': '0xc2132d05d31c914a87c6611c10748aeb04b58e8f'
  },
  {
    'chainId': '10',
    'chainName': 'optimism',
    'exploreWebsite': 'https://optimistic.etherscan.io',
    'path': '/token/',
    'image': 'https://gear5.s3.ap-northeast-1.amazonaws.com/image/chain/smallLogo/optimism.png',
    'cryptoId': 'gear5_token_optimism_0x94b008aa00579c1307b0ef2c499ad98a8ce58e58',
    'cryptoSrc': 'coingecko',
    'symbol': 'USDT',
    'decimal': 6,
    'address': '0x94b008aa00579c1307b0ef2c499ad98a8ce58e58'
  },
  {
    'chainId': '57',
    'chainName': 'syscoin',
    'exploreWebsite': 'https://explorer.syscoin.org',
    'path': '/token/',
    'image': 'https://gear5.s3.ap-northeast-1.amazonaws.com/image/chain/smallLogo/syscoin.png',
    'cryptoId': 'gear5_token_syscoin_0x922d641a426dcffaef11680e5358f34d97d112e1',
    'cryptoSrc': 'coingecko',
    'symbol': 'USDT',
    'decimal': 6,
    'address': '0x922d641a426dcffaef11680e5358f34d97d112e1'
  },
  {
    'chainId': '592',
    'chainName': 'astar',
    'exploreWebsite': 'https://astar.subscan.io',
    'path': '/erc20_token/',
    'image': 'https://gear5.s3.ap-northeast-1.amazonaws.com/image/chain/smallLogo/astar.png',
    'cryptoId': 'gear5_token_astar_0x3795c36e7d12a8c252a20c5a7b455f7c57b60283',
    'cryptoSrc': 'coingecko',
    'symbol': 'USDT',
    'decimal': 6,
    'address': '0x3795c36e7d12a8c252a20c5a7b455f7c57b60283'
  },
  {
    'chainId': '32520',
    'chainName': 'bitgert',
    'exploreWebsite': 'https://brisescan.com',
    'path': '/token/',
    'image': 'https://gear5.s3.ap-northeast-1.amazonaws.com/image/chain/smallLogo/bitgert.png',
    'cryptoId': 'gear5_token_bitgert_0xde14b85cf78f2add2e867fee40575437d5f10c06',
    'cryptoSrc': 'coingecko',
    'symbol': 'USDT',
    'decimal': 18,
    'address': '0xde14b85cf78f2add2e867fee40575437d5f10c06'
  },
  {
    'chainId': '2222',
    'chainName': 'kava',
    'exploreWebsite': 'https://explorer.kava.io',
    'path': '/token/',
    'image': 'https://gear5.s3.ap-northeast-1.amazonaws.com/image/chain/smallLogo/kava.png',
    'cryptoId': 'gear5_token_kava_0xb44a9b6905af7c801311e8f4e76932ee959c663c',
    'cryptoSrc': 'coingecko',
    'symbol': 'USDT',
    'decimal': 6,
    'address': '0xb44a9b6905af7c801311e8f4e76932ee959c663c'
  },
  {
    'chainId': null,
    'chainName': 'solana',
    'exploreWebsite': 'https://solscan.io',
    'path': '/token/',
    'image': 'https://gear5.s3.ap-northeast-1.amazonaws.com/image/chain/smallLogo/solana.png',
    'cryptoId': 'gear5_token_solana_es9vmfrzacermjfrf4h2fyd4kconky11mcce8benwnyb',
    'cryptoSrc': 'coingecko',
    'symbol': 'USDT',
    'decimal': 6,
    'address': 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB'
  },
  {
    'chainId': '40',
    'chainName': 'telos',
    'exploreWebsite': 'https://teloscan.io',
    'path': '/address/',
    'image': 'https://gear5.s3.ap-northeast-1.amazonaws.com/image/chain/smallLogo/telos.png',
    'cryptoId': 'gear5_token_telos_0xefaeee334f0fd1712f9a8cc375f427d9cdd40d73',
    'cryptoSrc': 'coingecko',
    'symbol': 'USDT',
    'decimal': 18,
    'address': '0xefaeee334f0fd1712f9a8cc375f427d9cdd40d73'
  },
  {
    'chainId': null,
    'chainName': 'aptos',
    'exploreWebsite': 'https://apscan.io',
    'path': '/account/',
    'image': 'https://gear5.s3.ap-northeast-1.amazonaws.com/image/chain/smallLogo/aptos.png',
    'cryptoId': 'gear5_token_aptos_0xf22bede237a07e121b56d91a491eb7bcdfd1f5907926a9e58338f964a01b17fa::asset::usdt',
    'cryptoSrc': 'coinmarketcap',
    'symbol': 'USDT',
    'decimal': null,
    'address': '0xf22bede237a07e121b56d91a491eb7bcdfd1f5907926a9e58338f964a01b17fa::asset::USDT'
  },
  {
    'chainId': null,
    'chainName': 'algorand',
    'exploreWebsite': 'https://algoexplorer.io',
    'path': '/asset/',
    'image': 'https://gear5.s3.ap-northeast-1.amazonaws.com/image/chain/smallLogo/algorand.png',
    'cryptoId': 'gear5_token_algorand_312769',
    'cryptoSrc': 'coinmarketcap',
    'symbol': 'USDT',
    'decimal': null,
    'address': '312769'
  },
  {
    'chainId': '1666600000',
    'chainName': 'harmony',
    'exploreWebsite': 'https://explorer.harmony.one',
    'path': '/token/',
    'image': 'https://gear5.s3.ap-northeast-1.amazonaws.com/image/chain/smallLogo/harmony.png',
    'cryptoId': 'gear5_token_harmony_0x3c2b8be99c50593081eaa2a724f0b8285f5aba8f',
    'cryptoSrc': 'coingecko',
    'symbol': 'USDT',
    'decimal': 6,
    'address': '0x3c2b8be99c50593081eaa2a724f0b8285f5aba8f'
  },
  {
    'chainId': '106',
    'chainName': 'velas',
    'exploreWebsite': 'https://evmexplorer.velas.com',
    'path': '/token/',
    'image': 'https://gear5.s3.ap-northeast-1.amazonaws.com/image/chain/smallLogo/velas.png',
    'cryptoId': 'gear5_token_velas_0xb44a9b6905af7c801311e8f4e76932ee959c663c',
    'cryptoSrc': 'coingecko',
    'symbol': 'USDT',
    'decimal': 6,
    'address': '0xb44a9b6905af7c801311e8f4e76932ee959c663c'
  },
  {
    'chainId': '1284',
    'chainName': 'moonbeam',
    'exploreWebsite': 'https://moonscan.io',
    'path': '/token/',
    'image': 'https://gear5.s3.ap-northeast-1.amazonaws.com/image/chain/smallLogo/moonbeam.png',
    'cryptoId': 'gear5_token_moonbeam_0xefaeee334f0fd1712f9a8cc375f427d9cdd40d73',
    'cryptoSrc': 'coingecko',
    'symbol': 'USDT',
    'decimal': 6,
    'address': '0xefaeee334f0fd1712f9a8cc375f427d9cdd40d73'
  },
  {
    'chainId': '250',
    'chainName': 'fantom',
    'exploreWebsite': 'https://ftmscan.com',
    'path': '/token/',
    'image': 'https://gear5.s3.ap-northeast-1.amazonaws.com/image/chain/smallLogo/fantom.png',
    'cryptoId': 'gear5_token_fantom_0x049d68029688eabf473097a2fc38ef61633a3c7a',
    'cryptoSrc': 'coingecko',
    'symbol': 'USDT',
    'decimal': 6,
    'address': '0x049d68029688eabf473097a2fc38ef61633a3c7a'
  },
  {
    'chainId': '7700',
    'chainName': 'canto',
    'exploreWebsite': 'https://evm.explorer.canto.io',
    'path': '/token/',
    'image': 'https://gear5.s3.ap-northeast-1.amazonaws.com/image/chain/smallLogo/canto.png',
    'cryptoId': 'gear5_token_canto_0xd567b3d7b8fe3c79a1ad8da978812cfc4fa05e75',
    'cryptoSrc': 'coingecko',
    'symbol': 'USDT',
    'decimal': 6,
    'address': '0xd567b3d7b8fe3c79a1ad8da978812cfc4fa05e75'
  },
  {
    'chainId': '82',
    'chainName': 'meter',
    'exploreWebsite': 'https://scan.meter.io',
    'path': '/token/',
    'image': 'https://gear5.s3.ap-northeast-1.amazonaws.com/image/chain/smallLogo/meter.png',
    'cryptoId': 'gear5_token_meter_0x5fa41671c48e3c951afc30816947126ccc8c162e',
    'cryptoSrc': 'coingecko',
    'symbol': 'USDT',
    'decimal': 6,
    'address': '0x5fa41671c48e3c951afc30816947126ccc8c162e'
  },
  {
    'chainId': '88',
    'chainName': 'tomochain',
    'exploreWebsite': 'https://scan.tomochain.com',
    'path': '/address/',
    'image': 'https://gear5.s3.ap-northeast-1.amazonaws.com/image/chain/smallLogo/tomochain.png',
    'cryptoId': 'gear5_token_tomochain_0x381b31409e4d220919b2cff012ed94d70135a59e',
    'cryptoSrc': 'coingecko',
    'symbol': 'USDT',
    'decimal': 6,
    'address': '0x381b31409e4d220919b2cff012ed94d70135a59e'
  },
  {
    'chainId': '1088',
    'chainName': 'metis',
    'exploreWebsite': 'https://andromeda-explorer.metis.io',
    'path': '/token/',
    'image': 'https://gear5.s3.ap-northeast-1.amazonaws.com/image/chain/smallLogo/metis.png',
    'cryptoId': 'gear5_token_metis_0xbb06dca3ae6887fabf931640f67cab3e3a16f4dc',
    'cryptoSrc': 'coingecko',
    'symbol': 'USDT',
    'decimal': 6,
    'address': '0xbb06dca3ae6887fabf931640f67cab3e3a16f4dc'
  },
  {
    'chainId': null,
    'chainName': 'tron',
    'exploreWebsite': 'https://tronscan.org/#',
    'path': '/token/',
    'image': 'https://gear5.s3.ap-northeast-1.amazonaws.com/image/chain/smallLogo/tron.png',
    'cryptoId': 'gear5_token_tron_tr7nhqjekqxgtci8q8zy4pl8otszgjlj6t',
    'cryptoSrc': 'coingecko',
    'symbol': 'USDT',
    'decimal': 6,
    'address': 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t'
  },
  {
    'chainId': '25',
    'chainName': 'cronos',
    'exploreWebsite': 'https://cronoscan.com',
    'path': '/token/',
    'image': 'https://gear5.s3.ap-northeast-1.amazonaws.com/image/chain/smallLogo/cronos.png',
    'cryptoId': 'gear5_token_cronos_0x66e428c3f67a68878562e79a0234c1f83c208770',
    'cryptoSrc': 'coingecko',
    'symbol': 'USDT',
    'decimal': 6,
    'address': '0x66e428c3f67a68878562e79a0234c1f83c208770'
  },
  {
    'chainId': '108',
    'chainName': 'thundercore',
    'exploreWebsite': 'https://viewblock.io/thundercore',
    'path': '/address/',
    'image': 'https://gear5.s3.ap-northeast-1.amazonaws.com/image/chain/smallLogo/thundercore.png',
    'cryptoId': 'gear5_token_thundercore_0x4f3c8e20942461e2c3bdd8311ac57b0c222f2b82',
    'cryptoSrc': 'coinmarketcap',
    'symbol': 'USDT',
    'decimal': null,
    'address': '0x4f3c8e20942461e2c3bdd8311ac57b0c222f2b82'
  },
  {
    'chainId': '30',
    'chainName': 'rsk',
    'exploreWebsite': 'https://explorer.rsk.co',
    'path': '/address/',
    'image': 'https://gear5.s3.ap-northeast-1.amazonaws.com/image/chain/smallLogo/rsk.png',
    'cryptoId': 'gear5_token_rsk_0xef213441a85df4d7acbdae0cf78004e1e486bb96',
    'cryptoSrc': 'coinmarketcap',
    'symbol': 'USDT',
    'decimal': null,
    'address': '0xef213441a85df4d7acbdae0cf78004e1e486bb96'
  },
  {
    'chainId': '100',
    'chainName': 'gnosis',
    'exploreWebsite': 'https://gnosisscan.io',
    'path': '/token/',
    'image': 'https://gear5.s3.ap-northeast-1.amazonaws.com/image/chain/smallLogo/gnosis.png',
    'cryptoId': 'gear5_token_gnosis_0x4ecaba5870353805a9f068101a40e0f32ed605c6',
    'cryptoSrc': 'coinmarketcap',
    'symbol': 'USDT',
    'decimal': null,
    'address': '0x4ecaba5870353805a9f068101a40e0f32ed605c6'
  },
  {
    'chainId': '8217',
    'chainName': 'klaytn',
    'exploreWebsite': 'https://scope.klaytn.com',
    'path': '/token/',
    'image': 'https://gear5.s3.ap-northeast-1.amazonaws.com/image/chain/smallLogo/klaytn.png',
    'cryptoId': 'gear5_token_klaytn_0xcee8faf64bb97a73bb51e115aa89c17ffa8dd167',
    'cryptoSrc': 'coinmarketcap',
    'symbol': 'USDT',
    'decimal': null,
    'address': '0xcee8faf64bb97a73bb51e115aa89c17ffa8dd167'
  },
  {
    'chainId': '32659',
    'chainName': 'fusion',
    'exploreWebsite': 'https://fsnscan.com',
    'path': '/token/',
    'image': 'https://gear5.s3.ap-northeast-1.amazonaws.com/image/chain/smallLogo/fusion.png',
    'cryptoId': 'gear5_token_fusion_0x9636d3294e45823ec924c8d89dd1f1dffcf044e6',
    'cryptoSrc': 'coinmarketcap',
    'symbol': 'USDT',
    'decimal': null,
    'address': '0x9636d3294e45823ec924c8d89dd1f1dffcf044e6'
  },
  {
    'chainId': '42161',
    'chainName': 'arbitrum',
    'exploreWebsite': 'https://arbiscan.io',
    'path': '/token/',
    'image': 'https://gear5.s3.ap-northeast-1.amazonaws.com/image/chain/smallLogo/arbitrum.png',
    'cryptoId': 'gear5_token_arbitrum_0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9',
    'cryptoSrc': 'coingecko',
    'symbol': 'USDT',
    'decimal': 6,
    'address': '0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9'
  },
  {
    'chainId': '24',
    'chainName': 'kardiachain',
    'exploreWebsite': 'https://explorer.kardiachain.io',
    'path': '/token/',
    'image': 'https://gear5.s3.ap-northeast-1.amazonaws.com/image/chain/smallLogo/kardiachain.png',
    'cryptoId': 'gear5_token_kardiachain_0x551a5dcac57c66aa010940c2dcff5da9c53aa53b',
    'cryptoSrc': 'coingecko',
    'symbol': 'USDT',
    'decimal': 18,
    'address': '0x551a5dcac57c66aa010940c2dcff5da9c53aa53b'
  },
  {
    'chainId': '1',
    'chainName': 'ethereum',
    'exploreWebsite': 'https://etherscan.io',
    'path': '/token/',
    'image': 'https://gear5.s3.ap-northeast-1.amazonaws.com/image/chain/smallLogo/ethereum.png',
    'cryptoId': 'gear5_token_ethereum_0xdac17f958d2ee523a2206206994597c13d831ec7',
    'cryptoSrc': 'coingecko',
    'symbol': 'USDT',
    'decimal': 6,
    'address': '0xdac17f958d2ee523a2206206994597c13d831ec7'
  },
  {
    'chainId': '4689',
    'chainName': 'iotex',
    'exploreWebsite': 'https://iotexscan.io',
    'path': '/token/',
    'image': 'https://gear5.s3.ap-northeast-1.amazonaws.com/image/chain/smallLogo/iotex.png',
    'cryptoId': 'gear5_token_iotex_0x3cdb7c48e70b854ed2fa392e21687501d84b3afc',
    'cryptoSrc': 'coingecko',
    'symbol': 'USDT',
    'decimal': null,
    'address': '0x3cdb7c48e70b854ed2fa392e21687501d84b3afc'
  },
  {
    'chainId': '56',
    'chainName': 'binance',
    'exploreWebsite': 'https://bscscan.com',
    'path': '/token/',
    'image': 'https://gear5.s3.ap-northeast-1.amazonaws.com/image/chain/smallLogo/binance.png',
    'cryptoId': 'gear5_token_binance_0x55d398326f99059ff775485246999027b3197955',
    'cryptoSrc': 'coingecko',
    'symbol': 'USDT',
    'decimal': 18,
    'address': '0x55d398326f99059ff775485246999027b3197955'
  }
]

// const DropdownBlog = () => {
//   return (
//     <>
//       <Dropdown className='custom-dropdown mb-0 tbl-orders-style'>
//         <Dropdown.Toggle className='btn sharp tp-btn i-false' as='div'>
//           <svg
//             width='25'
//             height='24'
//             viewBox='0 0 25 24'
//             fill='none'
//             xmlns='http://www.w3.org/2000/svg'
//           >
//             <path
//               d='M12.0335 13C12.5854 13 13.0328 12.5523 13.0328 12C13.0328 11.4477 12.5854 11 12.0335 11C11.4816 11 11.0342 11.4477 11.0342 12C11.0342 12.5523 11.4816 13 12.0335 13Z'
//               stroke='#342E59'
//               strokeWidth='2'
//               strokeLinecap='round'
//               strokeLinejoin='round'
//             />
//             <path
//               d='M12.0335 6C12.5854 6 13.0328 5.55228 13.0328 5C13.0328 4.44772 12.5854 4 12.0335 4C11.4816 4 11.0342 4.44772 11.0342 5C11.0342 5.55228 11.4816 6 12.0335 6Z'
//               stroke='#342E59'
//               strokeWidth='2'
//               strokeLinecap='round'
//               strokeLinejoin='round'
//             />
//             <path
//               d='M12.0335 20C12.5854 20 13.0328 19.5523 13.0328 19C13.0328 18.4477 12.5854 18 12.0335 18C11.4816 18 11.0342 18.4477 11.0342 19C11.0342 19.5523 11.4816 20 12.0335 20Z'
//               stroke='#342E59'
//               strokeWidth='2'
//               strokeLinecap='round'
//               strokeLinejoin='round'
//             />
//           </svg>
//         </Dropdown.Toggle>
//         <Dropdown.Menu className=' dropdown-menu-end' align='end'>
//           <Dropdown.Item>Details</Dropdown.Item>
//           <Dropdown.Item className='text-danger'>Cancel</Dropdown.Item>
//         </Dropdown.Menu>
//       </Dropdown>
//     </>
//   )
// }

const CryptoInfo = ({ copyAddress }) => {
  // const navigate = useNavigate()
  // const [mainExplorer, setMainExplorer] = useState()

  const handleClickExchange = (e, item) => {
    e.stopPropagation()
    e.preventDefault()
    // const urlDetail = formatUrlDetailFromUrlImageExchange(item)
    // navigate(`../../../../../${urlDetail}`)
  }

  const handleClickTag = (value) => {
    // navigate(`../../../../../${CRYPTO}/${encodeUrl(value)}`)
  }

  return (
    <>
      <div className='row'>
        <div className='col-xl-12'>
          <div className='row'>
            <div className='col-xl-8 col-xxl-8'>
              <CoinChart />
            </div>
            <div className='col-xl-4 col-xxl-4 col-sm-6'>
              <div className='card digital-cash'>
                <div className='card-header border-0'>
                  <h4 className='mb-0 heading'>Infomation</h4>
                  {/* <DropdownBlog /> */}
                </div>
                <div className='card-body py-0'>
                  <div className='text-center'>
                    <div className='media d-block'>
                      <svg
                        width='126'
                        height='126'
                        viewBox='0 0 126 126'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          d='M84.0001 49.8757C83.9965 45.5281 80.4721 42.0049 76.1257 42.0001H52.5001V57.7501H76.1257C80.4721 57.7465 83.9965 54.222 84.0001 49.8757Z'
                          fill='#FFAB2D'
                        />
                        <path
                          d='M52.5001 83.9999H76.1257C80.4745 83.9999 84.0001 80.4743 84.0001 76.1255C84.0001 71.7756 80.4745 68.2499 76.1257 68.2499H52.5001V83.9999Z'
                          fill='#FFAB2D'
                        />
                        <path
                          d='M63 0C28.2061 0 0 28.2061 0 63C0 97.7938 28.2061 126 63 126C97.7938 126 126 97.7938 126 63C125.96 28.2226 97.7774 0.0398255 63 0V0ZM94.5007 76.4995C94.4883 86.4367 86.4367 94.4883 76.5009 94.4993V98.9996C76.5009 101.485 74.4849 103.5 72.0006 103.5C69.5149 103.5 67.5003 101.485 67.5003 98.9996V94.4993H58.5011V98.9996C58.5011 101.485 56.4851 103.5 54.0008 103.5C51.5151 103.5 49.5005 101.485 49.5005 98.9996V94.4993H36.001C33.5153 94.4993 31.5007 92.4847 31.5007 90.0004C31.5007 87.5147 33.5153 85.5001 36.001 85.5001H40.4999V40.4999H36.001C33.5153 40.4999 31.5007 38.4853 31.5007 35.9996C31.5007 33.5139 33.5153 31.4993 36.001 31.4993H49.5005V27.0004C49.5005 24.5147 51.5151 22.5001 54.0008 22.5001C56.4865 22.5001 58.5011 24.5147 58.5011 27.0004V31.4993H67.5003V27.0004C67.5003 24.5147 69.5149 22.5001 72.0006 22.5001C74.4863 22.5001 76.5009 24.5147 76.5009 27.0004V31.4993C86.3996 31.4581 94.4581 39.448 94.5007 49.3467C94.5227 54.5886 92.2498 59.5777 88.2796 63C92.2128 66.3838 94.4828 71.3098 94.5007 76.4995V76.4995Z'
                          fill='#FFAB2D'
                        />
                      </svg>
                      <div className='media-content'>
                        <h4 className='mt-0 mt-md-4 fs-20 font-w700 text-black mb-0'>
                                Digital Cash
                        </h4>
                        <span className='font-w600 text-black'>
                                Bitcoin
                        </span>
                        <span className='my-4 fs-16 font-w600 d-block'>
                          1 BITCOIN = 43,474.50 USD
                        </span>
                        {/* <p className='text-start'>
                                Dash is an open source cryptocurrency. It is an
                                altcoin that was forked from the Bitcoin
                                protocol. It is also a decentralized autonomous
                                organization (DAO)...
                        </p> */}
                        <div className='text-mt-5'>
                          <div className='row'>
                            <div className='col-xl-4 col-xxl-6 col-6'>
                              <div className='form-check custom-checkbox mb-3'>
                                <input
                                  type='checkbox'
                                  className='form-check-input'
                                  id='customCheckBox1'
                                  required
                                />
                                <label
                                  className='form-check-label'
                                  htmlFor='customCheckBox1'
                                >
                                  Scam
                                </label>
                              </div>
                            </div>
                            <div className='col-xl-4 col-xxl-6 col-6'>
                              <div className='form-check custom-checkbox mb-3'>
                                <input
                                  type='checkbox'
                                  className='form-check-input'
                                  id='customCheckBox1'
                                  required
                                />
                                <label
                                  className='form-check-label'
                                  htmlFor='customCheckBox1'
                                >
                              Warning
                                </label>
                              </div>
                            </div>

                            <div className='col-xl-4 col-xxl-6 col-6'>
                              <div className='form-check custom-checkbox mb-3 checkbox-success'>
                                <input
                                  type='checkbox'
                                  defaultChecked
                                  className='form-check-input'
                                  id='customCheckBox3'
                                  required
                                />
                                <label
                                  className='form-check-label'
                                  htmlFor='customCheckBox3'
                                >
                                  Proxy
                                </label>
                              </div>
                            </div>
                          </div>
                          <div className='mb-5'>
                            <ScamWarningDetail
                              isShow={true}
                              scamWarningReason={'This token has excessively high transaction fees The ownership of the contract renounced The owner of this smart-contract can blacklist accounts from sell'}
                              proofType={'warning'}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-xl-4 col-xxl-4 col-sm-6'>
              <div className='card quick-trade'>
                <div className='card-header pb-0 border-0 flex-wrap'>
                  <div>
                    <h4 className='heading mb-0'>More</h4>
                    {/* <p className='mb-0 fs-14'>
                      Lorem ipsum dolor sit amet, consectetur
                    </p> */}
                  </div>
                </div>
                <div className='card-body pt-3'>
                  <div className='basic-form'>
                    {productInfo?.details?.address && (
                      <div className='crypto-info item-list'>
                        <div className='crypto-info-item'>
                          <div className='crypto-info-item-key'>Address: </div>
                          <div className='crypto-info-item-address'>
                            <a href={'#'} target='_blank' rel='noreferrer'>
                              {/* <a href={mainExplorer} target='_blank' rel='noreferrer'> */}
                              {`${productInfo?.details?.address?.slice(
                                0,
                                5
                              )}...${productInfo?.details?.address?.slice(
                                productInfo?.details?.address?.length - 5,
                                productInfo?.details?.address?.length
                              )}`}
                            </a>
                            <CopyOutlined
                              style={{ padding: '0, 1rem' }}
                              onClick={(e) => {
                                e.preventDefault()
                                e.stopPropagation()
                                copyAddress(e, productInfo?.details?.address)
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                    {!_.isEmpty(productInfo?.details?.exchanges) && (
                      <div className='crypto-info-item item-list'>
                        <div className='crypto-info-item-key'>Exchanges: </div>
                        <div className='crypto-info-item-address'>
                          <Avatar.Group
                            maxCount={4}
                            size={25}
                            maxStyle={{
                              color: '#f56a00',
                              backgroundColor: '#fde3cf',
                              cursor: 'pointer'
                            }}
                          >
                            {productInfo?.details?.exchanges?.map((item, index) => (
                              <>
                                {console.log(productInfo)}
                                {item && (
                                  <Avatar
                                    size={25}
                                    src={item}
                                    key={index}
                                    className='crypto-info-exchange'
                                    onClick={(e) => handleClickExchange(e, item)}
                                  />
                                )}
                              </>
                            ))}
                          </Avatar.Group>
                        </div>
                      </div>
                    )}
                    {productInfo?.mores?.tag && (
                      <div className='crypto-info'>
                        <div className='crypto-info-item'>
                          <div className='crypto-info-item-key'>Tag(s): </div>
                          <div className='crypto-overview-list-tags'>
                            {productInfo?.mores?.tag?.map((item, index) => (
                              <div
                                // className="crypto-tag"
                                className='highlight-tag'
                                onClick={() => handleClickTag(item?.name)}
                                key={index}
                              >
                                {item?.name}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                    {/* {!showInfo && ( */}
                    <>
                      <div className='crypto-info-item-key'>Product Info: </div>
                      <div className='crypto-info'>
                        {/* source code */}
                        {/* <div className='crypto-info-item'>
                          {isShow?.sourceCode && (
                            <div className='crypto-tag-item'>
                            Source Code:
                              <CodeOutlined />
                              <div className='crypto-tag-item-list'>
                                {productInfo?.details?.sourceCode &&
                                  Object.keys(productInfo?.details?.sourceCode)?.map(
                                    (key) => {
                                      return (
                                        <React.Fragment key={key}>
                                          {productInfo?.details?.sourceCode[key] && (
                                            <div
                                              className='crypto-tag-item-list-children'
                                              key={key}
                                            >
                                              <a
                                                href={
                                                  productInfo?.details?.sourceCode[key]
                                                }
                                                target='_blank'
                                                rel='noreferrer'
                                              >
                                                {key}
                                              </a>
                                            </div>
                                          )}
                                        </React.Fragment>
                                      )
                                    }
                                  )}
                              </div>
                            </div>
                          )}
                        </div> */}
                        {/* community */}
                        <div className='crypto-info-item'>
                          {/* {isShow?.community && ( */}
                          <div className='crypto-tag-item'>
                              Community
                            <DownOutlined />
                            <div className='crypto-tag-item-list'>
                              {productInfo?.details &&
                                  Object.keys(productInfo?.details?.community).map(
                                    (key) => {
                                      return (
                                        <React.Fragment key={key}>
                                          {productInfo?.details?.community[key] && (
                                            <div
                                              className='crypto-tag-item-list-children'
                                              key={key}
                                            >
                                              <a
                                                href={
                                                  productInfo?.details?.community[key]
                                                }
                                                target='_blank'
                                                rel='noreferrer'
                                                className='crypto-tag-item-list-children-contract'
                                              >
                                                <span className='crypto-tag-item-list-children-contract'>
                                                  {
                                                    productInfo?.details?.community[
                                                      key
                                                    ]?.split('/')[2]
                                                  }
                                                </span>
                                                <LinkOutlined />
                                              </a>
                                            </div>
                                          )}
                                        </React.Fragment>
                                      )
                                    }
                                  )}
                            </div>
                          </div>
                          {/* )} */}
                        </div>
                        {/* contract */}
                        <div className='crypto-info-item'>
                          {multichain ? (
                            <>
                              {/* {isShow?.explorer && ( */}
                              <div className='crypto-tag-item'>
                                  Contract(s)
                                <DownOutlined />
                                <div className='crypto-tag-item-list'>
                                  {multichain?.map((item, index) => (
                                    <div
                                      className='crypto-tag-item-list-children'
                                      key={index}
                                    >
                                      <a
                                        href={`${item?.exploreWebsite}${item?.path}${item?.address}`}
                                        target='_blank'
                                        rel='noreferrer'
                                        className='crypto-tag-item-list-children-contract'
                                      >
                                        <Image src={item?.image} preview={false} />
                                        <span className='crypto-tag-item-list-children-contract-address'>
                                          {item?.address}
                                        </span>
                                        <CopyOutlined
                                          style={{ padding: '0, 1rem' }}
                                          onClick={(e) => {
                                            e.preventDefault()
                                            e.stopPropagation()
                                            copyAddress(e, item?.address)
                                          }}
                                        />
                                      </a>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              {/* )} */}
                            </>
                          ) : (
                            <>
                              {productInfo?.details?.explorer !== null && (
                                <a
                                  href={productInfo?.details?.explorer}
                                  className='crypto-tag-item'
                                  target='_blank'
                                  rel='noreferrer'
                                >
                                  Explorer
                                  <LinkOutlined />
                                </a>
                              )}
                            </>
                          )}
                        </div>
                        {/* founders */}
                        {/* <div className='crypto-info-item'>
                          {isShow?.founders && (
                            <div className='crypto-tag-item'>
                              Founders
                              <DownOutlined />
                              <div className='crypto-tag-item-list'>
                                {productInfo?.details?.founders?.map((item, index) => (
                                  <div
                                    className='crypto-tag-item-list-children'
                                    key={index}
                                  >
                                    <a
                                      href={item?.social[0]}
                                      target='_blank'
                                      rel='noreferrer'
                                    >
                                      {item?.name}
                                    </a>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div> */}
                        {/* website */}
                        <div className='crypto-info-item'>
                          {productInfo?.details?.website && (
                            <a
                              href={productInfo?.details?.website}
                              className='crypto-tag-item'
                              target='_blank'
                              rel='noreferrer'
                            >
                              Websites
                              <GlobalOutlined />
                            </a>
                          )}
                        </div>
                      </div>
                    </>
                    {/* )} */}
                  </div>
                </div>
                {/* <div className='card-footer border-0'>
                  <div className='row'>
                    <div className='col-6'>
                      <button className='btn d-flex  btn-success justify-content-between w-100'>
                BUY
                        <svg
                          className='ms-4 scale5'
                          width='16'
                          height='16'
                          viewBox='0 0 29 29'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            d='M5.35182 13.4965L5.35182 13.4965L5.33512 6.58823C5.33508 6.5844 5.3351 6.58084 5.33514 6.57759M5.35182 13.4965L5.83514 6.58306L5.33514 6.58221C5.33517 6.56908 5.33572 6.55882 5.33597 6.5545L5.33606 6.55298C5.33585 6.55628 5.33533 6.56514 5.33516 6.57648C5.33515 6.57684 5.33514 6.57721 5.33514 6.57759M5.35182 13.4965C5.35375 14.2903 5.99878 14.9324 6.79278 14.9305C7.58669 14.9287 8.22874 14.2836 8.22686 13.4897L8.22686 13.4896L8.21853 10.0609M5.35182 13.4965L8.21853 10.0609M5.33514 6.57759C5.33752 5.789 5.97736 5.14667 6.76872 5.14454C6.77041 5.14452 6.77217 5.14451 6.77397 5.14451L6.77603 5.1445L6.79319 5.14456L13.687 5.16121L13.6858 5.66121L13.687 5.16121C14.4807 5.16314 15.123 5.80809 15.1211 6.6022C15.1192 7.3961 14.4741 8.03814 13.6802 8.03626L13.6802 8.03626L10.2515 8.02798L23.4341 21.2106C23.9955 21.772 23.9955 22.6821 23.4341 23.2435C22.8727 23.8049 21.9625 23.8049 21.4011 23.2435L8.21853 10.0609M5.33514 6.57759C5.33513 6.57959 5.33514 6.58159 5.33514 6.5836L8.21853 10.0609M6.77407 5.14454C6.77472 5.14454 6.77537 5.14454 6.77603 5.14454L6.77407 5.14454Z'
                            fill='white'
                            stroke='white'
                          ></path>
                        </svg>
                      </button>
                    </div>
                    <div className='col-6'>
                      <button className='btn d-flex  btn-danger justify-content-between w-100'>
                SELL
                        <svg
                          className='ms-4 scale3'
                          width='16'
                          height='16'
                          viewBox='0 0 21 21'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            d='M16.9638 11.5104L16.9721 14.9391L3.78954 1.7565C3.22815 1.19511 2.31799 1.19511 1.75661 1.7565C1.19522 2.31789 1.19522 3.22805 1.75661 3.78943L14.9392 16.972L11.5105 16.9637L11.5105 16.9637C10.7166 16.9619 10.0715 17.6039 10.0696 18.3978C10.0677 19.1919 10.7099 19.8369 11.5036 19.8388L11.5049 19.3388L11.5036 19.8388L18.3976 19.8554L18.4146 19.8555L18.4159 19.8555C18.418 19.8555 18.42 19.8555 18.422 19.8555C19.2131 19.8533 19.8528 19.2114 19.8555 18.4231C19.8556 18.4196 19.8556 18.4158 19.8556 18.4117L19.8389 11.5035L19.8389 11.5035C19.8369 10.7097 19.1919 10.0676 18.3979 10.0695C17.604 10.0713 16.9619 10.7164 16.9638 11.5103L16.9638 11.5104Z'
                            fill='white'
                            stroke='white'
                          ></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className='d-flex mt-3 align-items-center'>
                    <div className='form-check custom-checkbox me-3'>
                      <input
                        type='checkbox'
                        className='form-check-input'
                        id='customCheckBox1'
                        required
                      />
                      <label
                        className='form-check-label fs-14 font-w400'
                        htmlFor='customCheckBox1'
                      >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut
                      </label>
                    </div>
                    <p className='mb-0'></p>
                  </div>
                </div> */}
              </div>
            </div>
            <div className='col-xl-8 col-xxl-8'>
              <div className='card quick-trade'>
                <div className='card-header pb-0 border-0 flex-wrap'>
                  <div>
                    <h4 className='heading mb-0'>About</h4>
                  </div>
                </div>
                <div className='card-body pt-0'>
                  <div className='basic-form'>
                    <Description
                      text='Tether (USDT) is a cryptocurrency with a value meant to mirror the value of the U.S. dollar. The idea was to create a stable cryptocurrency that can be used like digital dollars. Coins that serve this purpose of being a stable dollar substitute are called “stable coins.” Tether is the most popular stable coin and even acts as a dollar replacement on many popular exchanges! According to their site, Tether converts cash into digital currency, to anchor or “tether” the value of the coin to the price of national currencies like the US dollar, the Euro, and the Yen. Like other cryptos it uses blockchain. Unlike other cryptos, it is [according to the official Tether site] “100% backed by USD” (USD is held in reserve). The primary use of Tether is that it offers some stability to the otherwise volatile crypto space and offers liquidity to exchanges who can’t deal in dollars and with banks (for example to the sometimes controversial but leading exchange Bitfinex).

                      The digital coins are issued by a company called Tether Limited that is governed by the laws of the British Virgin Islands, according to the legal part of its website. It is incorporated in Hong Kong. It has emerged that Jan Ludovicus van der Velde is the CEO of cryptocurrency exchange Bitfinex, which has been accused of being involved in the price manipulation of bitcoin, as well as tether. Many people trading on exchanges, including Bitfinex, will use tether to buy other cryptocurrencies like bitcoin. Tether Limited argues that using this method to buy virtual currencies allows users to move fiat in and out of an exchange more quickly and cheaply. Also, exchanges typically have rocky relationships with banks, and using Tether is a way to circumvent that.

                      USDT is fairly simple to use. Once on exchanges like Poloniex or Bittrex, it can be used to purchase Bitcoin and other cryptocurrencies. It can be easily transferred from an exchange to any Omni Layer enabled wallet. Tether has no transaction fees, although external wallets and exchanges may charge one. In order to convert USDT to USD and vise versa through the Tether.to Platform, users must pay a small fee. Buying and selling Tether for Bitcoin can be done through a variety of exchanges like the ones mentioned previously or through the Tether.to platform, which also allows the conversion between USD to and from your bank account.'
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default CryptoInfo
