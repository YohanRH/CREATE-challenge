import pandas as pd
df = pd.read_csv('./data/table.csv')
df = df.dropna(axis=1, how='any')
df = df.loc[:, (df != '').any(axis=0)]
print(df)
df.to_csv('./data/table_processed.csv')