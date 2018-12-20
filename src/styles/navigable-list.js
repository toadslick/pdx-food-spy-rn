export default {
  cell: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 7,
    paddingBottom: 7,
    paddingLeft: 15,
    paddingRight: 15,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  activeCell: {
    backgroundColor: '#eee',
  },
  separator: {
    flex: 1,
    height: 1,
    backgroundColor: '#ddd',
  },
  textContainer: {
    justifyContent: 'center',
    flex: 1,
  },
  scoreContainer: {
    justifyContent: 'center',
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
    minWidth: 55,
  },
};
