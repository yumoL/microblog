/**
 * @description Blog view api
 */

const router = require('koa-router')()
const { loginRedirect } = require('../../middlewares/loginChecks')
const { getHomeBlogList } = require('../../controller/blog-home')
const { getProfileBlogList } = require('../../controller/blog-profile')
const { getSquareBlogList } = require('../../controller/blog-square')
const { isExist } = require('../../controller/user')
const { getFans, getFollowees } = require('../../controller/user-relation')
const { getAtMeCount, getAtMeBlogList, markAsRead } = require('../../controller/blog-at')

// home page
router.get('/', loginRedirect, async (ctx, next) => {
  const myUserInfo = ctx.session.userInfo
  const userId = myUserInfo.id

  // get blog list
  const result = await getHomeBlogList(userId)
  const { isEmpty, blogList, pageSize, pageIndex, count } = result.data


  // get fans
  const fansResult = await getFans(userId)
  const { count: fansCount, fansList } = fansResult.data

  // get followees
  const followeesResult = await getFollowees(userId)
  const { count: followeesCount, followeesList } = followeesResult.data

  // get @ count
  const atCountResult = await getAtMeCount(userId)
  const { count: atCount } = atCountResult.data

  await ctx.render('index', {
    blogData: { isEmpty, blogList, pageSize, pageIndex, count },
    userData: {
      userInfo: myUserInfo,
      fansData: {
        count: fansCount,
        list: fansList
      },
      followeesData: {
        count: followeesCount,
        list: followeesList
      },
      atCount
    }
  })
})

// profile page
router.get('/profile', loginRedirect, async (ctx, next) => {
  const { userName } = ctx.session.userInfo
  ctx.redirect(`/profile/${userName}`)
})

router.get('/profile/:userName', loginRedirect, async (ctx, next) => {
  const myUserInfo = ctx.session.userInfo
  const myUserName = myUserInfo.userName

  let curUserInfo
  const { userName: curUserName } = ctx.params
  const isMe = myUserName === curUserName
  if (isMe) {
    curUserInfo = myUserInfo
  } else {
    const existResult = await isExist(curUserName)
    if (existResult.errno !== 0) return
    curUserInfo = existResult.data
  }

  // get the first page of the blog list
  const result = await getProfileBlogList(curUserName, 0)
  const { isEmpty, blogList, pageSize, pageIndex, count } = result.data

  // get fans
  const fansResult = await getFans(curUserInfo.id)
  const { count: fansCount, fansList } = fansResult.data

  // check if this user is followed by the logged-in user
  const amIFollowed = fansList.some(item => {
    return item.userName === myUserName
  })

  // get followees
  const followeesResult = await getFollowees(curUserInfo.id)
  const { count: followeesCount, followeesList } = followeesResult.data

  // get @ count
  const atCountResult = await getAtMeCount(myUserInfo.id)
  const { count: atCount } = atCountResult.data

  await ctx.render('profile', {
    blogData: {
      isEmpty,
      blogList,
      pageSize,
      pageIndex,
      count
    },
    userData: {
      userInfo: curUserInfo,
      isMe,
      fansData: {
        count: fansCount,
        list: fansList,
      },
      followeesData: {
        count: followeesCount,
        list: followeesList
      },
      amIFollowed,
      atCount
    }
  })
})

router.get('/square', loginRedirect, async (ctx, next) => {
  const result = await getSquareBlogList(0)
  const { isEmpty, blogList, pageSize, pageIndex, count } = result.data
  await ctx.render('square', {
    blogData: {
      isEmpty,
      blogList,
      pageSize,
      pageIndex,
      count
    }
  })
})

// at me router
router.get('/at-me', loginRedirect, async (ctx, next) => {
  const { id: userId } = ctx.session.userInfo

  // get @ count
  const atCountResult = await getAtMeCount(userId)
  const { count: atCount } = atCountResult.data

  // get first page of list
  const result = await getAtMeBlogList(userId)
  const { isEmpty, blogList, pageSize, pageIndex, count } = result.data

  await ctx.render('atMe', {
    atCount,
    blogData: {
      isEmpty,
      blogList,
      pageSize,
      pageIndex,
      count
    }
  })

  // mark as read
  if (atCount > 0) {
    await markAsRead(userId)
  }
})

module.exports = router