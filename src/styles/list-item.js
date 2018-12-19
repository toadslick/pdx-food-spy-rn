export default {
  cell: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    paddingTop: 7,
    paddingBottom: 7,
    paddingLeft: 15,
    paddingRight: 15,
    overflow: 'hidden',
  },
  separator: {
    flex: 1,
    height: 1,
    backgroundColor: '#ddd',
  },
  textContainer: {
    justifyContent: 'center',
    flexShrink: 1,
  },
  scoreContainer: {
    justifyContent: 'center',
    flexShrink: 0,
    paddingLeft: 8,
  },
  title: {
    fontSize: 18,
  },
  subtitle: {
    marginTop: 2,
    fontSize: 14,
    color: '#666',
  },
  score: {
    fontSize: 30,
    fontWeight: '400',
    textAlign: 'right',
  },
};
