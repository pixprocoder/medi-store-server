// all post
const getPosts = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
  } catch (e) {
    console.log("");
  }
};

export const PostController = {
  getPosts,
};
